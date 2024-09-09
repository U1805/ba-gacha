<script setup lang="ts">
import MainContainer from '@/components/MainContainer.vue'
import GachaModal from '@/components/Windows/GachaModal.vue'
import HistoryModal from '@/components/Windows/HistoryModal.vue'
import HelpModal from '@/components/Windows/HelpModal.vue'

import { provide, reactive, ref } from 'vue'
import { getVideoPaths } from '@/assets/utils/api'
import { useGachaStore } from '@/stores'
const videoPaths = getVideoPaths()
const gachaStore = useGachaStore()

// 抽卡弹窗
const showGachaModal = ref(false)
const bodyGachaModal = ref('')
const hideModal = () => {
    showGachaModal.value = false
}
const showModal = (num: number, msg: string) => {
    showGachaModal.value = true
    bodyGachaModal.value = msg
    gachaStore.lastGachaNum = num
}
provide('hideModal', hideModal)

// 历史弹窗
const isHistoryModalShow = ref(false)
const hideHistoryModal = () => (isHistoryModalShow.value = false)
const showHistoryModal = () => (isHistoryModalShow.value = true)
provide('hideHistoryModal', hideHistoryModal)

// 说明弹窗
const isHelpModalShow = ref(false)
const hideHelpModal = () => (isHelpModalShow.value = false)
const showHelpModal = () => (isHelpModalShow.value = true)
provide('hideHelpModal', hideHelpModal)

//主界面卡池信息
const infos = reactive({
    duration: '2023/08/09 From 10:00 ~ 2099/01/01 Until 09:59',
    title: '通常招募',
    subtitle: '来招募更多性格迥异的学生吧!',
    notice: '选择招募 10 次，必定获得 1 名 3★ 学生! \n※ 点击右上角按钮查看招募记录',
    banners: ['/EventBanner0.png', '/EventBanner0.png', '/EventBanner0.png']
})
</script>

<template>
    <div id="main-view">
        <!-- 抽卡弹窗 -->
        <GachaModal v-show="showGachaModal">
            <template #body>
                <p>{{ bodyGachaModal }}</p>
            </template>
        </GachaModal>
        <!-- 历史弹窗 -->
        <HistoryModal v-show="isHistoryModalShow"></HistoryModal>
        <!-- 说明弹窗 -->
        <HelpModal v-show="isHelpModalShow"></HelpModal>
        <!-- 主界面 -->
        <MainContainer :infos="infos" :preview="videoPaths.preview">
            <template #header>
                <div class="header">
                    <div class="title">学生招募</div>
                    <div class="ap">999/999</div>
                    <div class="crash">999,999,999</div>
                    <div class="stone">999,999</div>
                    <a class="icon link"></a>
                    <a class="icon help" @click="showHelpModal"></a>
                    <a class="icon history" @click="showHistoryModal"></a>
                    <a class="icon setting"></a>
                </div>
            </template>
            <template #button-group>
                <div class="button-container main">
                    <div class="gacha-button button-blue" @click="showModal(1, '招募 1 次？')">
                        <img src="/Gacha0.png" class="gacha_icon" />
                        <div class="right">
                            <img src="/Stone.png" class="stone_icon" />
                            <div class="cost"><span>120</span></div>
                            <div class="text">招募 1 次</div>
                        </div>
                    </div>
                    <div class="gacha-button button-yellow" @click="showModal(10, '招募 10 次？')">
                        <img src="/Gacha1.png" class="gacha_icon" />
                        <div class="right">
                            <img src="/Stone.png" class="stone_icon" />
                            <div class="cost"><span>1200</span></div>
                            <div class="text">招募 10 次</div>
                        </div>
                    </div>
                </div>
            </template>
        </MainContainer>
    </div>
</template>

<style scoped lang="scss">
@import url('@/assets/styles/button-group.scss');
@import url('@/assets/styles/main-view.scss');

#main-view {
    @include display-center;
    @include hw-filled;
    overflow: hidden;
    border-radius: 20px;
}
</style>
