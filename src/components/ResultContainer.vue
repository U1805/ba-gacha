<script setup lang="ts">
import type { resultItem } from '@/assets/utils/interface'
import type { Ref } from 'vue'
import { inject, ref } from 'vue'

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
            <div class="gacha-button button-yellow" @click="showModal()">
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
        <!-- Modal begin -->
        <div class="modal-backdrop" v-show="isModal">
            <div class="modal">
                <div class="modal-header">
                    <span>通知</span>
                </div>
                <div class="modal-body">
                    <p>再次招募？</p>
                </div>
                <div class="modal-footer">
                    <div class="gacha-button button-gray" @click="hideModal()">
                        <div>取消</div>
                    </div>
                    <div class="gacha-button button-yellow" @click="getStudents(result.length)">
                        <div>OK</div>
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
    width: 1180px;
    height: 800px;
}
</style>
