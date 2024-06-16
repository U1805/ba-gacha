<script setup lang="ts">
import MainContainer from './components/MainContainer.vue'
import VideoContainer from './components/VideoContainer.vue'
import ResultContainer from './components/ResultContainer.vue'

import { onMounted, provide, reactive, ref } from 'vue'
import { fetchData, getVideoPaths } from './assets/utils/api'
import { useGachaStore } from '@/stores/index'
const gachaStore = useGachaStore()
const videoPaths = getVideoPaths()

const loader = ref()
onMounted(async () => {
    document.onreadystatechange = () => {
        // 关闭加载界面
        if (document.readyState === 'complete') loader.value.remove()
    }
    gachaStore.getData()
    gachaStore.setGacha(await fetchData())
})

// 抽卡弹窗
import GachaModal from './components/Windows/GachaModal.vue'
const showGachaModal = ref(false)
const numGachaModal = ref(1)
const bodyGachaModal = ref('')
const hideModal = () => {
    showGachaModal.value = false
}
const showModal = (num: number, msg: string) => {
    showGachaModal.value = true
    numGachaModal.value = num
    bodyGachaModal.value = msg
}
provide('hideModal', hideModal)

// 历史弹窗
import HistoryModal from './components/Windows/HistoryModal.vue'
const showHistoryModal = ref(false)
const hideHisModal = () => (showHistoryModal.value = false)
const showHisModal = () => (showHistoryModal.value = true)
provide('hideHisModal', hideHisModal)

// 说明弹窗
import HelpModal from './components/Windows/HelpModal.vue'
const showHelpModal = ref(false)
const hideHelModal = () => (showHelpModal.value = false)
const showHelModal = () => (showHelpModal.value = true)
provide('hideHelModal', hideHelModal)

//主界面卡池信息
const infos = reactive({
    duration: '2023/08/09 From 10:00 ~ 2099/01/01 Until 09:59',
    title: '通常招募',
    subtitle: '来招募更多性格迥异的学生吧!',
    notice: '选择招募 10 次，必定获得 1 名 3★ 学生! \n※ 点击右上角按钮查看招募记录'
})
</script>

<template>
    <!-- 加载画面 -->
    <div class="load-bg" ref="loader"><div class="loader"></div></div>
    <!-- 抽卡弹窗 -->
    <GachaModal v-show="showGachaModal" :num="numGachaModal">
        <template #body>
            <p>{{ bodyGachaModal }}</p>
        </template>
    </GachaModal>
    <!-- 历史弹窗 -->
    <HistoryModal v-show="showHistoryModal"></HistoryModal>
    <!-- 说明弹窗 -->
    <HelpModal v-show="showHelpModal"></HelpModal>
    <!-- 主界面 -->
    <MainContainer v-if="gachaStore.layerVisible[0]" :infos="infos" :preview="videoPaths.preview">
        <template #header>
            <div class="header">
                <div class="title">学生招募</div>
                <div class="ap">999/999</div>
                <div class="crash">999,999,999</div>
                <div class="stone">999,999</div>
                <a class="icon link"></a>
                <a class="icon help" @click="showHelModal"></a>
                <a class="icon history" @click="showHisModal"></a>
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
    <!-- 抽卡中 -->
    <VideoContainer v-if="gachaStore.layerVisible[1]" :videoPaths="videoPaths"></VideoContainer>
    <!-- 结算界面 -->
    <ResultContainer v-if="gachaStore.layerVisible[2]">
        <template #button-group>
            <div class="button-container result">
                <div class="gacha-button button-blue" @click="gachaStore.changeVisible(0)">
                    <div>确定</div>
                </div>
                <div class="gacha-button button-yellow" @click="showModal(numGachaModal, '再次招募？')">
                    <div>再来一次</div>
                </div>
                <div class="point-container">
                    <img src="/Point.png" />
                    <div class="text"><span>招募点数</span></div>
                    <div class="num">
                        <span>{{ gachaStore.totalCnt }}</span>
                    </div>
                </div>
            </div>
        </template>
    </ResultContainer>
</template>

<style scoped lang="scss">
@import url('./assets/styles/button-group.scss');
@import '@/assets/styles/link-icon.scss';

.load-bg {
    @include center;
    @include full-screen;
    z-index: 1000;
    background: white;
}
</style>

<style>
body {
    padding: 0;
    margin: 0;
}
</style>
