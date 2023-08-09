<script setup lang="ts">
import MainContainer from './components/MainContainer.vue'
import VideoContainer from './components/VideoContainer.vue'
import ResultContainer from './components/ResultContainer.vue'

import data from '@/assets/utils/students.json'
import type { myStudent, resultItem, historyItem } from '@/assets/utils/interface'
import type { Ref } from 'vue'
import { onMounted, provide, ref } from 'vue'

const database: myStudent[] = data
var result: Ref<resultItem[]> = ref([])
var history: Ref<historyItem[]> = ref([])
var totalCnt: Ref<number> = ref(0)
var layerVisible: Ref<boolean[]> = ref([true, false, false])
var flag: Ref<boolean> = ref(false)
var flag2: Ref<boolean> = ref(false) // 特殊三星

function changeVisible(layer: number) {
    layerVisible.value[layer] = !layerVisible.value[layer]
}

// gacha
const one_star: number = 0.79
const two_star: number = 0.185
// const three_star: number = 0.025
const special: number = 0.05
function getRandomInt(len: number) {
    return Math.floor(Math.random() * len)
}

function getRandomGacha() {
    let t = Math.random()
    let rank: number
    let student: myStudent

    if (t < one_star) rank = 1
    else if (t < two_star + one_star) rank = 2
    else rank = 3
    do {
        student = database[getRandomInt(database.length)]
    } while (student.StarGrade != rank)
    return student
}

function getStudents(num: number) {
    flag.value = false
    flag2.value = false
    result.value = []
    let twoStarFlag: boolean = false
    for (let i = 0; i < num; i++) {
        let student: myStudent = getRandomGacha()
        if (student.StarGrade > 1) twoStarFlag = true
        while (i == 9 && !twoStarFlag && student.StarGrade == 1) {
            student = getRandomGacha() // 十连保底
        }
        if (student.StarGrade == 3) flag.value = true
        var { Id, Name, Avatar, StarGrade, PathName, Collection } = student
        let res: resultItem = { PathName: PathName, Avatar: Avatar, StarGrade: StarGrade, isNew: false }
        let studentIdx = history.value.findIndex((element) => element.Id == student.Id)
        if (studentIdx > -1) {
            result.value.push(res)
            history.value[studentIdx].Cnt++
        } else {
            // new
            res.isNew = true
            result.value.push(res)
            let item: historyItem = {
                Id: Id,
                Name: Name,
                PathName: PathName,
                Avatar: Avatar,
                StarGrade: StarGrade,
                Collection: Collection,
                Cnt: 1
            }
            history.value.push(item)
        }
    }
    totalCnt.value += num
    console.debug(result.value)
    console.debug(history.value)
    console.debug(flag.value, flag2.value, twoStarFlag)
    setData()
    // 特殊三星
    if (flag.value && Math.random() < special) flag2.value = true
}

// store utils
const setData = () => {
    localStorage.setItem('history', JSON.stringify(history.value))
}
const getData = () => {
    const data = localStorage.getItem('history')
    history.value = data != null ? JSON.parse(data) : ([] as historyItem[])
    let cnt = 0
    for (let item of history.value) {
        cnt += item.Cnt
    }
    totalCnt.value = cnt
}
const resetData = () => {
    history.value = [] as historyItem[]
    totalCnt.value = 0
    setData()
}

onMounted(() => {
    getData()
})

onMounted(() => {
    document.onreadystatechange = () => {
        if (document.readyState === 'complete') {
            document.querySelector("#app > div:nth-child(1)")?.remove()
        }
    }
})

// provide & inject

provide('getStudents', getStudents)
provide('resetHistory', resetData)
provide('changeVisible', changeVisible)
provide('result', result)
provide('history', history)
provide('totalCnt', totalCnt)
provide('flag', flag)
provide('flag2', flag2)
</script>

<template>
    <div class="load-bg"><div class="loader"></div></div>
    <MainContainer style="position: absolute; z-index: 10" v-if="layerVisible[0]"></MainContainer>
    <VideoContainer style="position: absolute; z-index: 20" v-if="layerVisible[1]"></VideoContainer>
    <ResultContainer style="position: absolute; z-index: 30" v-if="layerVisible[2]"></ResultContainer>
</template>

<style scoped lang="scss">
.load-bg{
    @include center;
    @include full-screen;
    z-index:1000;
    background:white;
}
</style>

<script lang="ts">
// import { clickEffect } from '@/assets/utils/cursorEffect'
// clickEffect()
</script>
