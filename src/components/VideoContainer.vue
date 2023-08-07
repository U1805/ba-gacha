<script setup lang="ts">
import type { Ref } from 'vue'
import { inject, ref } from 'vue'

const changeVisibleParent = inject('changeVisible') as Function
const flag = inject('flag') as boolean
const flag2 = inject('flag2') as boolean
var layerVisible: Ref<boolean[]> = ref([true, false, false])
function changeVisible(layer: number) {
    layerVisible.value[layer] = !layerVisible.value[layer]
}

const arona_ended = () => {
    changeVisible(1)
    changeVisible(0)
}

const wait_ended = () => {
    changeVisible(2)
    changeVisible(1)
}

const sign_ended = () => {
    changeVisible(2)
    changeVisibleParent(1)
    changeVisibleParent(2)
}
</script>

<template>
    <div class="video">
        <video
            muted
            autoplay
            :src="'/blue-archive-gacha-simulator'+
                !(flag == flag2) ? '/arona_special.mp4' : '/arona_normal.mp4'"
            v-show="layerVisible[0]"
            @ended="arona_ended()"
            @click="arona_ended()"
        ></video>
        <video
            muted
            autoplay
            :src="'/blue-archive-gacha-simulator'+
                !(flag == flag2) ? '/wait_special.mp4' : '/wait_normal.mp4'"
            loop="true"
            v-show="layerVisible[1]"
            @click="wait_ended()"
        ></video>
        <video
            muted
            autoplay
            :src="'/blue-archive-gacha-simulator'+
                flag ? (flag2 ? '/sign_special2.mp4' : '/sign_special.mp4') : '/sign_normal.mp4'"
            v-show="layerVisible[2]"
            @ended="sign_ended()"
        ></video>
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
