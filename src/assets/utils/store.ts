import { reactive } from 'vue'
import type { historyItem } from './interface'

export const store = reactive({
    history: [] as historyItem[],
    totalCnt: 0,

    // store utils
    setData: function () {
        localStorage.setItem('history', JSON.stringify(this.history))
    },
    getData: function () {
        const data = localStorage.getItem('history')
        this.history = (data != null ? JSON.parse(data) : []) as historyItem[]
        let cnt = 0
        for (const item of this.history) {
            cnt += item.Cnt
        }
        this.totalCnt = cnt
    },
    resetData: function () {
        this.history = [] as historyItem[]
        this.totalCnt = 0
        this.setData()
    }
})
