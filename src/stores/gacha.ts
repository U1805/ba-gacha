import { useGachaStore } from '@/stores'
import type { bannerItem, myStudent, resultItem } from '../assets/utils/interface'

class Gacha {
    // 学生列表, 两星up学生id列表, 三星up学生id列表
    constructor(database: myStudent[], up_list_2: number[] = [], up_list_3: number[] = []) {
        const star_2_up = up_list_2.length
        const star_3_up = up_list_3.length
        const star_1 = database.filter((s) => s.StarGrade == 1).length
        const star_2 = database.filter((s) => s.StarGrade == 2).length - star_2_up
        const star_3 = database.filter((s) => s.StarGrade == 3).length - star_3_up
        this.database = database.map((item) => {
            let prob = 0
            let last_prob = 0
            if (item.StarGrade === 3) {
                if (up_list_3.includes(item.Id)) {
                    prob = 0.007 / star_3_up
                    last_prob = 0.007 / star_3_up
                } else {
                    prob = 0.023 / star_3
                    last_prob = 0.023 / star_3
                }
            } else if (item.StarGrade === 2) {
                if (up_list_2.includes(item.Id)) {
                    prob = 0.03 / star_2_up
                    last_prob = 0.03 / star_2_up
                } else {
                    prob = 0.155 / star_2
                    last_prob = 0.94 / star_2
                }
            } else if (item.StarGrade === 1) {
                prob = 0.785 / star_1
                last_prob = 0
            }
            return {
                ...item,
                Prob: prob,
                LastProb: last_prob
            }
        })
        this.gachaStore = useGachaStore()
    }
    gachaStore: any
    database: bannerItem[]
    flag: boolean = false // 是否获得三星
    flag2: boolean = false // 特殊三星
    special: number = 0.05 // 蓝变紫概率
    result: resultItem[] = []
    /*
        抽卡概率 
        一般情况下1星学生概率78.5%，2星学生概率18.5%，3星学生概率3%。
        TODO: 限时招募和限定招募中
        - UP3星学生从3星总概率中分走0.7%，其他3星学生均分剩余2.3%；
        - UP2星学生从2星总概率中分走3%，其他2星学生均分剩余15.5%
        蓝变紫概率不确定
    */

    fisherYatesShuffle(arr: any[]) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)) // random index
            ;[arr[i], arr[j]] = [arr[j], arr[i]] // swap
        }
    }

    // 随机获取一个学生
    getRandomStudent(last: boolean = false) {
        const data_temp = JSON.parse(JSON.stringify(this.database))
        this.fisherYatesShuffle(data_temp)

        const random = Math.random()
        let sum = 0

        for (let i = 0; i < data_temp.length; i++) {
            const item = data_temp[i]
            sum += last ? item.LastProb : item.Prob
            if (sum >= random)
                return {
                    Id: item.Id,
                    Name: item.Name,
                    StarGrade: item.StarGrade
                } as myStudent
        }
        console.warn('not get random student success')
    }

    // 确定三星，此时 database 中只有三星学生
    getSureStudent() {
        const data_temp = JSON.parse(JSON.stringify(this.database))
        this.fisherYatesShuffle(data_temp)

        const index = Math.floor(Math.random() * data_temp.length)
        const item = data_temp[index]
        return {
            Id: item.Id,
            Name: item.Name,
            StarGrade: item.StarGrade
        } as myStudent
    }

    // 抽卡
    getStudents(num: number, sure: boolean = false) {
        this.flag = false // 是否获得三星
        this.flag2 = false // 特殊三星
        this.result = []

        for (let i = 0; i < num; i++) {
            let student: myStudent
            if (sure) student = this.getSureStudent()
            else student = this.getRandomStudent()!

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
