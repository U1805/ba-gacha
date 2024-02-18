<script setup lang="ts">
import { getFandomAvatar, getSchaledbInfo } from '@/assets/utils/api'
import type { Ref } from 'vue'
import { inject, ref } from 'vue'
import { store } from '@/assets/utils/store'
import type { Gacha } from '@/assets/utils/gacha'

const gacha = inject('gacha') as Gacha
const changeVisible = inject('changeVisible') as Function
function confirm() {
    changeVisible(2)
    changeVisible(0)
}

function getStudents(num: number) {
    gacha.getStudents(num)
    changeVisible(2)
    changeVisible(1)
}

function backgroundColor(star: number) {
    switch (star) {
        case 1:
            return 'blue'
        case 2:
            return 'golden'
        case 3:
            return 'pink'
        default:
            return 'blue'
    }
}

var isModal: Ref<boolean> = ref(false)
function showModal() {
    isModal.value = true
}
function hideModal() {
    isModal.value = false
}
</script>

<template>
    <div class="result">
        <div class="result-container">
            <div class="shadow-box" :class="{ shadow: item['StarGrade'] > 1 }" v-for="item in gacha.result">
                <a :href="getSchaledbInfo(item['PathName'])" target="_blank">
                    <div class="card" :class="backgroundColor(item['StarGrade'])">
                        <div class="char"><img :src="getFandomAvatar(item['Avatar'])" /></div>
                        <div class="new" v-show="item['isNew']"><img src="/New.png" /></div>
                        <div class="star"><img src="/Star.png" v-for="_ in item['StarGrade']"/></div>
                    </div>
                </a>
            </div>
        </div>
        <div class="button-container">
            <div class="gacha-button button-blue" @click="confirm">
                <div>{{ $t('confirm') }}</div>
            </div>
            <div class="gacha-button button-yellow" @click="showModal()">
                <div>{{ $t('again') }}</div>
            </div>
            <div class="point-container">
                <img src="/Point.png" />
                <div class="text">
                    <span>{{ $t('recruitPoint') }}</span>
                </div>
                <div class="num">
                    <span>{{ store.totalCnt }}</span>
                </div>
            </div>
        </div>
        <!-- Modal begin -->
        <div class="modal-backdrop" v-show="isModal">
            <div class="modal">
                <div class="modal-header">
                    <span>{{ $t('modalTitle') }}</span>
                </div>
                <div class="modal-body">
                    <p>{{ $t('modalAgain') }}</p>
                </div>
                <div class="modal-footer">
                    <div class="gacha-button button-gray" @click="hideModal()">
                        <div>{{ $t('cancel') }}</div>
                    </div>
                    <div class="gacha-button button-yellow" @click="getStudents(gacha.result.length)">
                        <div>{{ $t('confirm') }}</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal end -->
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/result-card.scss';
@import '@/assets/styles/modal.scss';

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
