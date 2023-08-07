<script setup lang="ts">
import MainContainer from './components/MainContainer.vue'
import ResultContainer from './components/ResultContainer.vue'

import data from '@/assets/utils/students.json'
import { myStudent } from '@/assets/utils/interface'
import { provide, Ref, ref } from 'vue'

const database: myStudent[] = data
var result: Ref<myStudent[]> = ref([])
var layerVisible: Ref<boolean[]> = ref([true, false, false])

function getRandomInt(len: number) {
    return Math.floor(Math.random() * len)
}

function getStudents(num: number) {
    result.value = []
    for (let i = 0; i < num; i++) {
        result.value[i] = database[getRandomInt(database.length)]
    }
    console.log(result.value)
}

function changVisible(layer: number) {
    layerVisible.value[layer] = !layerVisible.value[layer]
    console.log(layerVisible.value)
}

provide('getStudents', getStudents)
provide('changeVisible', changVisible)
provide('result', result)
</script>

<template>
    <MainContainer style="position: absolute; z-index: 10" v-if="layerVisible[0]"></MainContainer>
    <VideoContainer style="position: absolute; z-index: 20" v-if="layerVisible[1]"></VideoContainer>
    <ResultContainer
        style="position: absolute; z-index: 30"
        v-if="layerVisible[2]"
    ></ResultContainer>
</template>

<style scoped lang="scss"></style>
