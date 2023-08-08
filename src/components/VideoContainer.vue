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
            :src="
                flag === flag2
                    ? 'https://fs-im-kefu.7moor-fs1.com/29397395/4d2c3f00-7d4c-11e5-af15-41bf63ae4ea0/1691494911014/arona_normal.mp3'
                    : 'https://fs-im-kefu.7moor-fs1.com/29397395/4d2c3f00-7d4c-11e5-af15-41bf63ae4ea0/1691494911146/arona_special.mp3'
            "
            v-show="layerVisible[0]"
            @ended="arona_ended()"
            @click="arona_ended()"
        ></video>
        <video
            muted
            autoplay
            :src="
                flag === flag2
                    ? 'https://fs-im-kefu.7moor-fs1.com/29397395/4d2c3f00-7d4c-11e5-af15-41bf63ae4ea0/1691494975709/wait_normal.mp3'
                    : 'https://fs-im-kefu.7moor-fs1.com/29397395/4d2c3f00-7d4c-11e5-af15-41bf63ae4ea0/1691494975556/wait_special.mp3'
            "
            loop="true"
            v-show="layerVisible[1]"
            @click="wait_ended()"
        ></video>
        <video
            muted
            autoplay
            :src="
                (flag2 && 'https://fs-im-kefu.7moor-fs1.com/29397395/4d2c3f00-7d4c-11e5-af15-41bf63ae4ea0/1691495023077/sign_special2.mp3') ||
                (flag && 'https://fs-im-kefu.7moor-fs1.com/29397395/4d2c3f00-7d4c-11e5-af15-41bf63ae4ea0/1691495022938/sign_special.mp3') ||
                'https://fs-im-kefu.7moor-fs1.com/29397395/4d2c3f00-7d4c-11e5-af15-41bf63ae4ea0/1691495022800/sign_normal.mp3'
            "
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
