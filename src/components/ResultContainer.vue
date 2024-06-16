<script setup lang="ts">
import { useGachaStore } from '@/stores/index'
import { getAvatarNoBg } from '@/assets/utils/api'
const gachaStore = useGachaStore()

const colorTable: { [key: number]: string } = {
    1: 'blue',
    2: 'golden',
    3: 'pink'
}
</script>

<template>
    <div class="result" style="position: absolute; z-index: 30">
        <div class="result-container">
            <div
                class="shadow-box"
                :class="{ shadow: item.StarGrade > 1 }"
                :key="index"
                v-for="(item, index) in gachaStore.gachaResult"
            >
                <div class="card" :class="colorTable[item.StarGrade]">
                    <div class="char"><img :src="getAvatarNoBg(item.Id)" /></div>
                    <div class="new" v-show="item['isNew']"><img src="/New.png" /></div>
                    <div class="star">
                        <img src="/Star.png" v-for="(_, index) in item.StarGrade" :key="index" />
                    </div>
                </div>
            </div>
        </div>
        <slot name="button-group"></slot>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/result-card.scss';

.result {
    @include center;
    flex-direction: column;
    @include full-screen;
    background: url('/Background.png');
    background-size: cover;
}

.result-container {
    @include center;
    align-content: center;
    flex-wrap: wrap;
    width: 1280px;
    height: 800px;
}

.shadow-box {
    height: 300px;
    margin: 0 5px;
    @include skew;

    &.shadow {
        background: linear-gradient(
            to top,
            rgb(255 255 255/0.1) 10%,
            rgb(250 250 250/0.5) 25%,
            rgb(245 245 245/0.9) 45%,
            rgb(245 245 245/0.9) 55%,
            rgb(250 250 250/0.5) 75%,
            rgb(255 255 255/0.1) 90%
        );
    }
}
</style>
