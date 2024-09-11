<script setup lang="ts">
import { useGachaStore } from '@/stores/index'
import { computed } from 'vue'
const gachaStore = useGachaStore()
const props = defineProps(['infos', 'select'])
const emits = defineEmits(['changeBanner'])

const select_info = computed(() => {
    return props.infos[props.select]
})
</script>

<template>
    <div class="table-container">
        <slot name="header"></slot>
        <div class="preview">
            <video muted loop autoplay :src="select_info.preview_video" type="video/mp4"></video>
        </div>
        <div class="gradient"></div>

        <div class="gacha-wrapper">
            <div class="event-banner">
                <img
                    :src="item.preview_img"
                    :key="index"
                    v-for="(item, index) in props.infos"
                    @click="emits('changeBanner', index)"
                />
            </div>
            <div class="event-scroll">
                <span class="dot" v-for="(_, index) in props.infos" :key="index"></span>
            </div>

            <div class="tab-container">
                <div class="tab-body">
                    <div class="duration">{{ select_info.duration }}</div>
                    <div class="title">{{ select_info.title }}</div>
                    <div class="subtitle">{{ select_info.subtitle }}</div>
                    <div class="notice">{{ select_info.notice }}</div>
                    <slot name="button-group"></slot>
                </div>
                <div class="tab-foot">
                    <img src="/images/Point.png" draggable="false" class="point_icon" />
                    <div class="text">
                        <span>招募点数</span>
                    </div>
                    <div class="point">
                        <span>{{ gachaStore.totalCnt }}</span>
                    </div>
                    <div class="select" @click="gachaStore.resetData()">
                        <span>重置</span>
                    </div>
                </div>
            </div>
        </div>

        <slot name="extra"></slot>
    </div>
</template>

<style scoped lang="scss">
@import url('@/assets/styles/main-view.scss');
</style>
