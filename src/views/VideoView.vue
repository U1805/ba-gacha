<script setup lang="ts">
import { useGachaStore } from '@/stores/index'
import { getVideoPaths } from '../assets/utils/api'
import { useRouter } from 'vue-router'
import type { Ref } from 'vue'
import { ref } from 'vue'

const router = useRouter()

// 抽卡视频分为三段，中间段循环播放
const layerVisible: Ref<boolean[]> = ref([true, false, false])
const changeVisible = (layer: number) => {
    layerVisible.value = [false, false, false]
    if (layer >= 0) layerVisible.value[layer] = true
}

const arona_ended = () => {
    changeVisible(1)
    isSigning.value = true
}
const wait_ended = () => {
    changeVisible(2)
    isSigning.value = false
}
const sign_ended = () => {
    changeVisible(-1)
    router.push('/result')
}
const videoPaths = getVideoPaths()
const gachaStore = useGachaStore()

const isSigning = ref(false)
</script>

<template>
    <!-- 抽卡中 -->
    <div class="video">
        <div class="sign-board" v-show="isSigning">
            <vue-esign
                ref="esign"
                :width="2000"
                :height="900"
                :viewWidth="36"
                :viewHeight="16"
                :lineColor="'rgb(131,255,251)'"
                :lineWidth="20"
            />
        </div>
        <video muted autoplay v-show="layerVisible[0]" @ended="arona_ended()" @click="arona_ended()">
            <source :src="videoPaths.arona[gachaStore.gachaResultStar()]" type="video/mp4" />
        </video>
        <video muted autoplay v-show="layerVisible[1]" @click="wait_ended()" loop="true">
            <source :src="videoPaths.wait[gachaStore.gachaResultStar()]" type="video/mp4" />
        </video>
        <video muted autoplay v-show="layerVisible[2]" @ended="sign_ended()">
            <source :src="videoPaths.sign[gachaStore.gachaResultStar()]" type="video/mp4" />
        </video>
    </div>
</template>

<style scoped lang="scss">
.video {
    video {
        object-fit: cover;
        border-radius: 20px;
        overflow: hidden;
        @include hw(45vw, 80vw);
    }
}

.sign-board {
    @include position(33vw, auto, auto, 32vw);
    z-index: 10;
    overflow: hidden;
}
</style>
