<script setup lang="ts">
import MainContainer from '@/components/MainContainer.vue'
import CustomModal from '@/components/CustomModal.vue'

import { reactive, ref } from 'vue'
import { getVideoPaths, getAvatarBg } from '@/assets/utils/api'
import { useGachaStore } from '@/stores'
import { useRouter } from 'vue-router'

const videoPaths = getVideoPaths()
const gachaStore = useGachaStore()
const router = useRouter()

// 抽卡弹窗
const showGachaModal = ref(false)
const bodyGachaModal = ref('')
const showModal = (num: number, msg: string) => {
    showGachaModal.value = true
    bodyGachaModal.value = msg
    gachaStore.lastGachaNum = num
}
function getStudents() {
    gachaStore.gachaStudents(gachaStore.lastGachaNum)
    router.push('/gacha')
}

// 历史弹窗
const showHistoryModal = ref(false)
// 说明弹窗
const showHelpModal = ref(false)
// 概率情报
const showProbModal = ref(false)

//主界面卡池信息
const infos = reactive({
    duration: '2023/08/09 From 10:00 ~ 2099/01/01 Until 09:59',
    title: '通常招募',
    subtitle: '来招募更多性格迥异的学生吧!',
    notice: '选择招募 10 次，必定获得 1 名 3★ 学生! \n※ 点击右上角按钮查看招募记录',
    banners: ['/ba-gacha/EventBanner0.png', '/ba-gacha/EventBanner0.png', '/ba-gacha/EventBanner0.png']
})
</script>

<template>
    <div id="main-view">
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
                <p>{{ bodyGachaModal }}</p>
                <div style="margin: 20px 0; font-weight: 500; font-size: 20px">青耀石消耗数量</div>
                <div class="point">
                    <img src="/Stone.png" />
                    <div class="num">
                        <span>{{ gachaStore.lastGachaNum * 120 }}</span>
                    </div>
                </div>
            </div>
        </CustomModal>
        <!-- 历史弹窗 -->
        <CustomModal v-model="showHistoryModal" :title="'招募记录'">
            <div class="history">
                <div class="card" v-for="(item, idx) in gachaStore.history" :key="idx">
                    <div class="star">
                        <img src="/Star.png" v-for="(_, idx2) in item['StarGrade']" :key="idx2" />
                    </div>
                    <div class="char"><img :src="getAvatarBg(item.Id)" /></div>
                    <div class="name">{{ item['Name'] }} * {{ item['Cnt'] }}</div>
                </div>
            </div>
        </CustomModal>
        <!-- 说明弹窗 -->
        <CustomModal v-model="showHelpModal" :title="'帮助'"></CustomModal>
        <!-- 概率情报 -->
        <CustomModal v-model="showProbModal" :title="'概率情报'"></CustomModal>
        <!-- 主界面 -->
        <MainContainer :infos="infos" :preview="videoPaths.preview">
            <template #header>
                <div class="header">
                    <div class="title">学生招募</div>
                    <div class="ap">999/999</div>
                    <div class="crash">999,999,999</div>
                    <div class="stone">999,999</div>
                    <a class="icon link"></a>
                    <a class="icon help" @click="showHelpModal = true"></a>
                    <a class="icon history" @click="showHistoryModal = true"></a>
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
            <template #extra>
                <div class="left-bottom">
                    <div class="text" @click="showProbModal = true">
                        <span>概率情报</span>
                    </div>
                </div>
            </template>
        </MainContainer>
    </div>
</template>

<style scoped lang="scss">
@import url('@/assets/styles/button-group.scss');
@import url('@/assets/styles/main-view.scss');
@import url('@/assets/styles/modal.scss');

#main-view {
    @include display-center;
    @include hw-filled;
    overflow: hidden;
    border-radius: 20px;
}
</style>
