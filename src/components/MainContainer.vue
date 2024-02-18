<script setup lang="ts">
import { getVideoPaths } from '@/assets/utils/api'
import type { Ref } from 'vue'
import { provide, ref } from 'vue'
import { store } from '@/assets/utils/store'

import GachaModal from './GachaModal.vue'
import HistoryModal from './HistoryModal.vue'
import SettingModal from './SettingModal.vue'
import HelpModal from './HelpModal.vue'

const home = ref('https://github.com/U1805/blue-archive-gacha-simulator')
console.log(home.value + '/blob/main/README-zh.md')

var isModal: Ref<boolean[]> = ref([false, false, false, false, false]) // 单抽 十连 历史 设置 帮助
function showModal(index: number) {
    isModal.value[index] = true
}
function hideModal(index: number) {
    isModal.value[index] = false
}

const videoPaths = getVideoPaths()
provide('isModal', isModal)
provide('hideModal', hideModal)
</script>

<template>
    <div class="table-container">
        <div class="header">
            <div class="title">{{ $t('mainTitle') }}</div>
            <div class="ap">999/999</div>
            <div class="crash">999,999,999</div>
            <div class="stone">999,999</div>
            <a class="icon link" :href="home"></a>
            <a class="icon help" @click="showModal(4)"></a>
            <a class="icon history" @click="showModal(2)"></a>
            <a class="icon setting" @click="showModal(3)"></a>
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
                        <span>{{ store.totalCnt }}</span>
                    </div>
                    <div class="select" @click="store.resetData()">
                        <span>{{ $t('reset') }}</span>
                    </div>
                </div>
            </div>
        </div>
        <GachaModal></GachaModal>
        <HistoryModal></HistoryModal>
        <SettingModal></SettingModal>
        <HelpModal></HelpModal>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/gacha-tab.scss';
@import '@/assets/styles/link-icon.scss';
@import '@/assets/styles/main.scss';
</style>
