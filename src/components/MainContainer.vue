<script setup lang="ts">
import { useGachaStore } from '@/stores/index'
const gachaStore = useGachaStore()
const props = defineProps(['infos', 'preview'])
</script>

<template>
    <div class="table-container">
        <slot name="header"></slot>
        <div class="preview">
            <video muted loop autoplay>
                <source :src="props.preview" type="video/mp4" />
            </video>
        </div>
        <div class="gradient"></div>

        <div class="gacha-wrapper">
            <div class="event-banner">
                <img :src="url" v-for="(url, index) in props.infos.banners" :key="index" />
            </div>
            <div class="event-scroll">
                <span class="dot" v-for="(_, index) in props.infos.banners" :key="index"></span>
            </div>

            <div class="tab-container">
                <div class="tab-body">
                    <div class="duration">{{ props.infos.duration }}</div>
                    <div class="title">{{ props.infos.title }}</div>
                    <div class="subtitle">{{ props.infos.subtitle }}</div>
                    <div class="notice">{{ props.infos.notice }}</div>
                    <slot name="button-group"></slot>
                </div>
                <div class="tab-foot">
                    <img src="/Point.png" draggable="false" class="point_icon" />
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
