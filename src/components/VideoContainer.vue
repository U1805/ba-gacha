<script setup lang="ts">
import type { Ref } from 'vue'
import { ref } from 'vue'
import { useGachaStore } from '@/stores/index'

// 抽卡视频分为三段，中间段循环播放
const layerVisible: Ref<boolean[]> = ref([true, false, false]) 
const changeVisible = (layer: number) => {
    layerVisible.value = [false, false, false]
    if (layer >= 0) layerVisible.value[layer] = true
}

const arona_ended = () => changeVisible(1)
const wait_ended = () => changeVisible(2)
const sign_ended = () => {
    changeVisible(-1)
    gachaStore.changeVisible(2) // 进入结果页
}

const gachaStore = useGachaStore()
const props = defineProps(['videoPaths'])
</script>

<template>
    <div class="video" style="position: absolute; z-index: 20">
        <video muted autoplay v-show="layerVisible[0]" @ended="arona_ended()" @click="arona_ended()">
            <source :src="props.videoPaths.arona[gachaStore.gachaResultStar()]" type="video/mp4" />
        </video>
        <video muted autoplay v-show="layerVisible[1]" @click="wait_ended()" loop="true">
            <source :src="props.videoPaths.wait[gachaStore.gachaResultStar()]" type="video/mp4" />
        </video>
        <video muted autoplay v-show="layerVisible[2]" @ended="sign_ended()">
            <source :src="props.videoPaths.sign[gachaStore.gachaResultStar()]" type="video/mp4" />
        </video>
    </div>
</template>

<style scoped lang="scss">
.video {
    @include full-screen;
    overflow: hidden;

    video {
        object-fit: fill;
        @include full-screen;
    }
}
</style>
