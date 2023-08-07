<script setup lang="ts">
import type { resultItem } from '@/assets/utils/interface'
import { inject } from 'vue'

const getStudents_ = inject('getStudents') as Function
const changeVisible = inject('changeVisible') as Function
const result = inject('result') as resultItem[]
const totalCnt = inject('totalCnt') as number
function confirm() {
    changeVisible(2)
    changeVisible(0)
}

function getStudents(num: number) {
    getStudents_(num)
    changeVisible(2)
    changeVisible(1)
}

function backgroundColor(star: number) {
    if (star == 1) return 'blue'
    else if (star == 2) return 'golden'
    else if (star == 3) return 'pink'
    else return null
}
</script>

<template>
    <div class="result">
        <div class="result-container">
            <div class="card" :class="backgroundColor(item['StarGrade'])" v-for="item in result">
                <div class="char">
                    <img :src="item['Avatar']" />
                </div>
                <div class="new" v-show="item['isNew']"><img src="/New.png" /></div>
                <div class="star"><img src="/Star.png" v-for="n in item['StarGrade']" /></div>
            </div>
        </div>
        <div class="button-container">
            <div class="gacha-button button-blue" @click="confirm">
                <div>确定</div>
            </div>
            <div class="gacha-button button-yellow" @click="getStudents(result.length)">
                <div>再来一次</div>
            </div>
            <div class="point-container">
                <img src="/Point.png" />
                <div class="text"><span>招募点数</span></div>
                <div class="num">
                    <span>{{ totalCnt }}</span>
                </div>
            </div>
        </div>
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
    width: 70%;
    height: 100%;
}

.button-container {
    width: 40%;
    height: 10%;
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 100px;

    .gacha-button {
        position: relative;
        overflow: hidden;
        box-shadow: 0px 5px 5px -5px rgb(0 0 0/0.6);
        @include skew;
        @include center;

        div {
            @include noskew;
            @include font-big;
        }
    }

    .button-blue {
        @include gacha-button($blue, '/ButtonBlueBg0.png', '/ButtonBlueBg1.png');
    }

    .button-yellow {
        @include gacha-button($golden, '/ButtonYellowBg0.png', '/ButtonYellowBg1.png');
    }
}
</style>
