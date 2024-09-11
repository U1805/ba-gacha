<script setup lang="ts">
import ResultContainer from '@/components/ResultContainer.vue'
import CustomModal from '@/components/CustomModal.vue'
import { useGachaStore } from '@/stores/index'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

// 抽卡弹窗
const showGachaModal = ref(false)
function getStudents() {
    gachaStore.gachaStudents(gachaStore.lastGachaNum)
    router.push('/gacha')
}

const router = useRouter()
const gachaStore = useGachaStore()
</script>

<template>
    <!-- 抽卡弹窗 -->
    <CustomModal
        v-model="showGachaModal"
        :title="'通知'"
        :width="'40vw'"
        :height="'28vw'"
        :footer="true"
        @ok="getStudents()"
    >
        <div class="gacha">
            <p>再次招募？</p>
            <div style="margin: 20px 0; font-weight: 500; font-size: 20px">青耀石消耗数量</div>
            <div class="point">
                <img src="/images/Stone.png" />
                <div class="num">
                    <span>{{ gachaStore.lastGachaNum * 120 }}</span>
                </div>
            </div>
        </div>
    </CustomModal>
    <!-- 结算界面 -->
    <ResultContainer>
        <template #button-group>
            <div class="button-container result">
                <div class="gacha-button button-blue" @click="router.push('/')">
                    <div>确定</div>
                </div>
                <div class="gacha-button button-yellow" @click="showGachaModal = true">
                    <div>再来一次</div>
                </div>
                <div class="point-container">
                    <img src="/images/Point.png" />
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
@import url('@/assets/styles/modal.scss');

.button-container {
    z-index: 3;
}
</style>
