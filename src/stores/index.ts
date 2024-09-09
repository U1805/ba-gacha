import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { historyItem, myStudent, resultItem } from '@/assets/utils/interface'
import { Gacha } from './gacha'

export const useGachaStore = defineStore('counter', () => {
    const history: Ref<historyItem[]> = ref([])
    const gacha: Ref<Gacha> = ref(new Gacha([]))
    const gachaResult: Ref<resultItem[]> = ref([])
    const lastGachaNum: Ref<number> = ref(1)

    const totalCnt = computed(() => {
        let cnt = 0
        history.value.forEach((item) => (cnt += item.Cnt))
        return cnt
    })

    // 本地持久化
    const setData = () => {
        localStorage.setItem('history', JSON.stringify(history.value))
    }
    const getData = () => {
        const data = localStorage.getItem('history')
        history.value = (data != null ? JSON.parse(data) : []) as historyItem[]
    }
    const resetData = () => {
        history.value = [] as historyItem[]
        setData()
    }

    // 抽卡相关
    const setGacha = (data: myStudent[]) => {
        gacha.value = new Gacha(data)
    }
    const isNew = (id: number) => {
        const index = history.value.findIndex((ele) => ele.Id === id)
        return index === -1
    }
    const pushHistory = (student: myStudent) => {
        if (isNew(student.Id)) {
            history.value.push({
                ...student,
                Cnt: 1
            })
        } else {
            const index = history.value.findIndex((ele) => ele.Id === student.Id)
            history.value[index].Cnt++
        }
    }
    const gachaStudents = (num: number) => {
        gacha.value.getStudents(num)
        gachaResult.value = gacha.value.result
        setData()
    }
    const gachaResultStar = () => {
        if (gacha.value.flag2) return 2 // 特殊三星
        if (gacha.value.flag) return 1 // 三星
        return 0 // 无三星
    }

    return {
        lastGachaNum,
        history,
        totalCnt,
        gachaResult,
        setData,
        getData,
        resetData,
        setGacha,
        isNew,
        pushHistory,
        gachaStudents,
        gachaResultStar // 抽卡结果显示 无三星/普通三星/特殊三星
    }
})
