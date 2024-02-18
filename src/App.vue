<script setup lang="ts">
import MainContainer from './components/MainContainer.vue'
import VideoContainer from './components/VideoContainer.vue'
import ResultContainer from './components/ResultContainer.vue'

import data from '@/assets/utils/students.json'
import type { myStudent } from '@/assets/utils/interface'
import type { Ref } from 'vue'
import { onMounted, provide, ref } from 'vue'
import { store } from '@/assets/utils/store'
import { Gacha } from './assets/utils/gacha'

const database: myStudent[] = data
const gacha = new Gacha(database)
var layerVisible: Ref<boolean[]> = ref([true, false, false])

function changeVisible(layer: number) {
    layerVisible.value[layer] = !layerVisible.value[layer]
}

onMounted(() => {
    store.getData()
    document.onreadystatechange = () => {
        if (document.readyState === 'complete') {
            document.querySelector('#app > div:nth-child(1)')?.remove()
        }
    }
})

// provide & inject
provide('gacha', gacha)
provide('changeVisible', changeVisible)
provide('history', history)
</script>

<template>
    <div class="load-bg"><div class="loader"></div></div>
    <MainContainer style="position: absolute; z-index: 10" v-if="layerVisible[0]"></MainContainer>
    <VideoContainer style="position: absolute; z-index: 20" v-if="layerVisible[1]"></VideoContainer>
    <ResultContainer style="position: absolute; z-index: 30" v-if="layerVisible[2]"></ResultContainer>
</template>

<style lang="scss">
.load-bg {
    @include center;
    @include full-screen;
    z-index: 1000;
    background: white;
}

body {
    padding: 0;
    margin: 0;
}
</style>
