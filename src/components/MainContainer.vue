<script setup lang="ts">
import CloseIcon from './icons/CloseIcon.vue'

import type { historyItem } from '@/assets/utils/interface'
import { getSchaledbAvatar, getSchaledbInfo, getVideoPaths } from '@/assets/utils/api'
import type { Ref } from 'vue'
import { inject, ref } from 'vue'

const getStudents_ = inject('getStudents') as Function
const changeVisible = inject('changeVisible') as Function
const resetHistory = inject('resetHistory') as Function
const history = inject('history') as historyItem[]
const totalCnt = inject('totalCnt') as number
const home = ref('https://github.com/U1805/blue-archive-gacha-simulator')

function getStudents(num: number) {
    getStudents_(num)
    changeVisible(0)
    changeVisible(1)
}

var isModal: Ref<boolean[]> = ref([false, false, false]) // 单抽 十连 历史
function showModal(index: number) {
    isModal.value[index] = true
}
function hideModal(index: number) {
    isModal.value[index] = false
}

import { useI18n } from 'vue-i18n'
import i18n from '@/assets/utils/i18n'
const { t } = useI18n()

function switchLocale() {
    let list = i18n.global.availableLocales
    let index = list.findIndex((element) => element === i18n.global.locale.value)
    i18n.global.locale.value = list[(index + 1) % list.length]
}

const videoPaths = getVideoPaths()
</script>

<template>
    <div class="table-container">
        <div class="header">
            <div class="title">{{ $t('mainTitle') }}</div>
            <div class="ap">999/999</div>
            <div class="crash">999,999,999</div>
            <div class="stone">999,999</div>
            <a class="icon link" :href="home"></a>
            <a class="icon help" :href="home + '/blob/main/README-zh.md'"></a>
            <a class="icon history" @click="showModal(2)"></a>
            <a class="icon locale" @click="switchLocale()"></a>
        </div>

        <div class="preview">
            <video muted loop autoplay>
                <source :src="videoPaths.preview" type="video/mp4" />
            </video>
        </div>
        <div class="gradient"></div>

        <div class="gacha-wrapper">
            <div class="event-banner">
                <img src="/EventBanner0.png" />
                <img src="/EventBanner0.png" />
                <img src="/EventBanner1.png" />
            </div>
            <div class="event-scroll">
                <span class="dot active"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>

            <div class="tab-container">
                <div class="tab-body">
                    <div class="duration">2023/08/09 From 10:00 ~ 2099/01/01 Until 09:59</div>
                    <div class="title">{{ $t('title') }}</div>
                    <div class="subtitle">{{ $t('subtitle') }}</div>
                    <div class="notice">{{ $t('notice') }}</div>
                    <!-- Button-container begin -->
                    <div class="button-container">
                        <div class="gacha-button button-blue" @click="showModal(0)">
                            <img src="/Gacha0.png" class="gacha_icon" />
                            <div class="right">
                                <img src="/Stone.png" class="stone_icon" />
                                <div class="cost"><span>120</span></div>
                                <div class="text">{{ $t('gacha1') }}</div>
                            </div>
                        </div>
                        <div class="gacha-button button-yellow" @click="showModal(1)">
                            <img src="/Gacha1.png" class="gacha_icon" />
                            <div class="right">
                                <img src="/Stone.png" class="stone_icon" />
                                <div class="cost"><span>1200</span></div>
                                <div class="text">{{ $t('gacha10') }}</div>
                            </div>
                        </div>
                    </div>
                    <!-- Button-container end -->
                </div>
                <div class="tab-foot">
                    <img src="/Point.png" draggable="false" class="point_icon" />
                    <div class="text">
                        <span>{{ $t('recruitPoint') }}</span>
                    </div>
                    <div class="point">
                        <span>{{ totalCnt }}</span>
                    </div>
                    <div class="select" @click="resetHistory()">
                        <span>{{ $t('reset') }}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- Gacha Modal begin -->
        <div class="modal-backdrop" v-show="isModal[index]" v-for="(num, index) in [1, 10]">
            <div class="modal">
                <div class="modal-header">
                    <span>{{ $t('modalTitle') }}</span>
                    <CloseIcon class="icon close" @click="hideModal(index)" />
                </div>
                <div class="modal-body">
                    <p>{{ $t('modalBody').replace('%num', num.toString()) }}</p>
                </div>
                <div class="modal-footer">
                    <div class="gacha-button button-gray" @click="hideModal(index)">
                        <div>{{ $t('cancel') }}</div>
                    </div>
                    <div class="gacha-button button-blue" @click="getStudents(num)">
                        <div>{{ $t('confirm') }}</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Gacha Modal end -->
        <!-- History Modal begin -->
        <div class="modal-backdrop" v-show="isModal[2]">
            <div class="modal history">
                <div class="modal-header">
                    <span>{{ $t('history') }}</span>
                    <CloseIcon class="icon close" @click="hideModal(2)" />
                </div>
                <div class="modal-body">
                    <div class="card" v-for="item in history">
                        <a :href="getSchaledbInfo(item['PathName'])" target="_blank">
                            <div class="star"><img src="/Star.png" v-for="_ in item['StarGrade']" /></div>
                            <div class="char"><img :src="getSchaledbAvatar(item['Id'].toString())" /></div>
                            <div class="name">{{ item['Name'] }} * {{ item['Cnt'] }}</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- History Modal end -->
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/gacha-tab.scss';
@import '@/assets/styles/modal.scss';
@import '@/assets/styles/link-icon.scss';

.table-container {
    display: grid;
    grid-template-columns: 45vw 55vw;
    grid-template-rows: $header_hight 1fr;

    background: url('/Background.png') no-repeat;
    background-size: cover;
    overflow: hidden;
}

.header {
    grid-area: 1 / 1 / 2 / 3;
    background: url('/Header.png') top no-repeat;
    background-size: cover;
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.441));
    background-size: contain;
    position: relative;
    z-index: 5;

    div {
        position: fixed;
        top: 5px;
        font-size: 30px;
        font-weight: 500;
    }

    .title {
        left: 150px;
        font-weight: 700;
    }

    .ap {
        left: 750px;
    }

    .crash {
        left: 1010px;
    }

    .stone {
        left: 1260px;
    }
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

.gacha-wrapper {
    grid-area: 1 / 2 / 3 / 3;
    height: 100vh;
    z-index: 4;
    @include center;
    flex-direction: column;

    div {
        width: 844px;
    }

    .event-banner {
        display: flex;
        justify-content: flex-start;
        height: 140px;
        overflow: hidden;

        img {
            height: 140px;
            margin: 0 5px;
        }
    }

    .event-scroll {
        background-color: #ffffffba;
        height: 13.5px;
        width: fit-content;
        padding: 0 10px;
        margin: 8px;
        border-radius: 20px;
        @include center;

        .dot {
            cursor: pointer;
            height: 5px;
            width: 5px;
            margin: 0 2px;
            background-color: $black-shadow;
            border-radius: 50%;
            display: inline-block;
            transition: background-color 0.6s ease;
        }

        .active,
        .dot:hover {
            background-color: $blue;
        }
    }

    .tab-container {
        height: 520px;
    }
}
</style>
