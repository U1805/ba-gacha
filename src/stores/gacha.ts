import { useGachaStore } from '@/stores'
import type { myStudent, resultItem } from '../assets/utils/interface'

class Gacha {
    constructor(database: myStudent[]) {
        this.database = database
        this.gachaStore = useGachaStore()
    }
    flag: boolean = false  // 是否获得三星
    flag2: boolean = false // 特殊三星
    database: myStudent[]
    gachaStore: any
    /*
        抽卡概率 
        一般情况下1星学生概率78.5%，2星学生概率18.5%，3星学生概率3%。
        TODO: 限时招募和限定招募中
        - UP3星学生从3星总概率中分走0.7%，其他3星学生均分剩余2.3%；
        - UP2星学生从2星总概率中分走3%，其他2星学生均分剩余15.5%
        蓝变紫概率不确定
    */
    one_star: number = 0.785  // 一星率
    two_star: number = 0.185 // 二星率
    special: number = 0.05   // 蓝变紫概率

    result: resultItem[] = []

    _getRandomInt(len: number) {
        return Math.floor(Math.random() * len)
    }

    getRandomStudent(rank: number) {
        let student: myStudent
        do {
            student = this.database[this._getRandomInt(this.database.length)]
        } while (student.StarGrade != rank)
        return student
    }

    getStudents(num: number) {
        this.flag = false  // 是否获得三星
        this.flag2 = false // 特殊三星
        this.result = []

        for (let i = 0; i < num; i++) {
            const t = Math.random()
            let rank: number
            
            if (t < this.one_star) rank = 1
            else if (t < this.two_star + this.one_star) rank = 2
            else rank = 3
            if (i == 9 && rank == 1) rank = 2 // 十连保底

            const student:myStudent = this.getRandomStudent(rank)
            const studentR: resultItem = {
                ...student,
                isNew: this.gachaStore.isNew(student.Id)
            }
            this.gachaStore.pushHistory(student)
            this.result.push(studentR)
            if (student.StarGrade == 3) this.flag = true
        }
        if (this.flag && Math.random() < this.special) this.flag2 = true
    }
}

export { Gacha }
