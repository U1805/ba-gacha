<script setup lang="ts">
import { inject, ref, Ref } from 'vue'

const changeVisibleParent = inject('changeVisible') as Function
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
            src="/arona_normal.mp4"
            v-show="layerVisible[0]"
            @ended="arona_ended()"
            @click="arona_ended()"
        ></video>
        <video
            muted
            autoplay
            src="/wait_normal.mp4"
            loop="true"
            v-show="layerVisible[1]"
            @click="wait_ended()"
        ></video>
        <video
            muted
            autoplay
            src="/sign_normal.mp4"
            v-show="layerVisible[2]"
            @ended="sign_ended()"
            @click="sign_ended()"
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
