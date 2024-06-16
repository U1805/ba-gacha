<script setup lang="ts">


import { useGachaStore } from '@/stores/index'
const gachaStore = useGachaStore()
const props = defineProps(['infos', 'preview'])
</script>

<template>
    <div class="table-container" style="position: absolute; z-index: 10">
        <slot name="header"></slot>

        <div class="preview">
            <video muted loop autoplay>
                <source :src="props.preview" type="video/mp4" />
            </video>
        </div>
        <div class="gradient"></div>

        <div class="gacha-wrapper">
            <div class="event-banner">
                <img src="/EventBanner0.png" />
                <img src="/EventBanner0.png" />
                <img src="/EventBanner0.png" />
            </div>
            <div class="event-scroll">
                <span class="dot active"></span>
                <span class="dot"></span>
                <span class="dot"></span>
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
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/gacha-tab.scss';

.table-container {
    display: grid;
    grid-template-columns: 45vw 55vw;
    grid-template-rows: $header_hight 1fr;

    background: url('/Background.png') no-repeat;
    background-size: cover;
    overflow: hidden;
}

.preview {
    grid-area: 1 / 1 / 3 / 2;
    height: 100vh;

    video {
        height: 100%;
    }
}

.gradient {
    grid-area: 1 / 2 / 3 / 3;
    display: flex;
    height: 100vh;
    position: relative;
    width: 1111px;
    z-index: 3;
    content: url('/Background.png');
    mask-image: linear-gradient(to left, #fff 70%, transparent 100%);
    -webkit-mask-image: linear-gradient(to left, #fff 70%, transparent 100%);
}

.point_icon {
    width: 110px;
    margin: -10px -20px;
    z-index: 1;
}
</style>
