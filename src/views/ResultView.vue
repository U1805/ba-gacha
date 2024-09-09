<script setup lang="ts">
import ResultContainer from '@/components/ResultContainer.vue'
import GachaModal from '@/components/Windows/GachaModal.vue'
import { useGachaStore } from '@/stores/index'
import { useRouter } from 'vue-router'
import { provide, ref } from 'vue'

// 抽卡弹窗
const showGachaModal = ref(false)
const bodyGachaModal = ref('再次招募？')
const hideModal = () => {
    showGachaModal.value = false
}
const showModal = () => {
    showGachaModal.value = true
}
provide('hideModal', hideModal)

const router = useRouter()
const gachaStore = useGachaStore()
</script>

<template>
    <!-- 抽卡弹窗 -->
    <GachaModal v-show="showGachaModal">
        <template #body>
            <p>{{ bodyGachaModal }}</p>
        </template>
    </GachaModal>
    <!-- 结算界面 -->
    <ResultContainer>
        <template #button-group>
            <div class="button-container result">
                <div class="gacha-button button-blue" @click="router.push('/')">
                    <div>确定</div>
                </div>
                <div class="gacha-button button-yellow" @click="showModal()">
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
@import url('@/assets/styles/button-group.scss');

.button-container {
    z-index: 3;
}
</style>
