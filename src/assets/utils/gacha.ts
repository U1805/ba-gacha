import type { historyItem, myStudent, resultItem } from './interface'
import { store } from './store'

class Gacha {
    constructor(database: myStudent[]) {
        this.database = database
    }
    flag: boolean = false
    flag2: boolean = false // 特殊三星
    // gacha
    one_star: number = 0.79 // 一星率
    two_star: number = 0.185 // 二星率
    three_star: number = 1 - (this.one_star + this.two_star) // 三星率
    special: number = 0.05 // 蓝变紫概率
    database: myStudent[]

    result: resultItem[] = []

    _getRandomInt(len: number) {
        return Math.floor(Math.random() * len)
    }

    getRandomGacha() {
        const t = Math.random()
        let rank: number
        let student: myStudent

        if (t < this.one_star) rank = 1
        else if (t < this.two_star + this.one_star) rank = 2
        else rank = 3
        do {
            student = this.database[this._getRandomInt(this.database.length)]
        } while (student.StarGrade != rank)
        return student
    }

    getStudents(num: number) {
        this.flag = false
        this.flag2 = false
        this.result = []
        let twoStarFlag: boolean = false // 是否获得二星(及三星)
        for (let i = 0; i < num; i++) {
            let student: myStudent = this.getRandomGacha()
            if (student.StarGrade > 1) twoStarFlag = true
            while (i == 9 && !twoStarFlag && student.StarGrade == 1) {
                student = this.getRandomGacha() // 十连保底
            }
            if (student.StarGrade == 3) this.flag = true
            const { Id, Name, Avatar, StarGrade, PathName } = student
            const res: resultItem = { PathName: PathName, Avatar: Avatar, StarGrade: StarGrade, isNew: false }
            const studentIdx = store.history.findIndex((element) => element.Id == student.Id)
            if (studentIdx > -1) {
                this.result.push(res)
                store.history[studentIdx].Cnt++
            } else {
                // new
                res.isNew = true
                this.result.push(res)
                const item: historyItem = {
                    Id: Id,
                    Name: Name,
                    PathName: PathName,
                    Avatar: Avatar,
                    StarGrade: StarGrade,
                    Cnt: 1
                }
                store.history.push(item)
            }
        }
        store.totalCnt += num
        console.debug(this.result)
        console.debug(store.history)
        console.debug(this.flag, this.flag2, twoStarFlag)
        store.setData()
        // 特殊三星
        if (this.flag && Math.random() < this.special) this.flag2 = true
    }
}

export { Gacha }
