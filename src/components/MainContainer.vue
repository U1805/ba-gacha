<script setup lang="ts">
import type { Ref } from 'vue'
import { inject, ref } from 'vue'

const getStudents_ = inject('getStudents') as Function
const changeVisible = inject('changeVisible') as Function
const resetHistory = inject('resetHistory') as Function
const totalCnt = inject('totalCnt') as number
function getStudents(num: number) {
    getStudents_(num)
    changeVisible(0)
    changeVisible(1)
}

var isModal: Ref<boolean[]> = ref([false, false])
function showModal(index: number) {
    isModal.value[index] = true
}
function hideModal(index: number) {
    isModal.value[index] = false
}
</script>

<template>
    <div class="table-container">
        <div class="header">
            <div class="title">学生招募</div>
            <div class="ap">999/999</div>
            <div class="crash">999,999,999</div>
            <div class="stone">999,999</div>
            <a class="link" href="https://github.com/U1805/blue-archive-gacha-simulator"></a>
            <a
                class="help"
                href="https://github.com/U1805/blue-archive-gacha-simulator/blob/main/README-zh.md"
            ></a>
        </div>

        <div class="preview">
            <video
                muted
                autoplay
                loop="true"
                src="https://fs-im-kefu.7moor-fs1.com/29397395/4d2c3f00-7d4c-11e5-af15-41bf63ae4ea0/1691494716332/Preview0.mp3"
            ></video>
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
                    <div class="duration">07/25/2023 From 10:00 ~ 08/01/2023 Until 09:59</div>
                    <div class="title">Fest Recruitment</div>
                    <div class="subtitle">Increased chance to get 3★ Mika!<br /></div>
                    <div class="notice">
                        One 2★ or higher student is guaranteed for every ten recruitments!<br />※ Students who
                        have already been recruited will be converted into Eligma and Eleph.
                    </div>
                    <!-- Button-container begin -->
                    <div class="button-container">
                        <div class="gacha-button button-blue" @click="showModal(0)">
                            <img src="/Gacha0.png" class="gacha_icon" />
                            <div class="right">
                                <img src="/Stone.png" class="stone_icon" />
                                <div class="cost"><span>120</span></div>
                                <div class="text">招募 1 次</div>
                            </div>
                        </div>
                        <div class="gacha-button button-yellow" @click="showModal(1)">
                            <img src="/Gacha1.png" class="gacha_icon" />
                            <div class="right">
                                <img src="/Stone.png" class="stone_icon" />
                                <div class="cost"><span>1200</span></div>
                                <div class="text">招募 10 次</div>
                            </div>
                        </div>
                    </div>
                    <!-- Button-container end -->
                </div>
                <div class="tab-foot">
                    <img src="/Point.png" draggable="false" class="point_icon" />
                    <div class="text"><span>招募点数</span></div>
                    <div class="point">
                        <span>{{ totalCnt }}</span>
                    </div>
                    <div class="select" @click="resetHistory()"><span>重置</span></div>
                </div>
            </div>
        </div>
        <!-- Modal begin -->
        <div class="modal-backdrop" v-show="isModal[index]" v-for="(num, index) in [1, 10]">
            <div class="modal">
                <div class="modal-header">
                    <span>通知</span>
                </div>
                <div class="modal-body">
                    <p>招募 {{ num }} 次？</p>
                </div>
                <div class="modal-footer">
                    <div class="gacha-button button-gray" @click="hideModal(index)">
                        <div>取消</div>
                    </div>
                    <div class="gacha-button button-blue" @click="getStudents(num)">
                        <div>OK</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal end -->
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
    display: flex;
    background: url('/Header.png') top no-repeat;
    background-size: cover;
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.441));
    background-size: contain;
    position: relative;
    z-index: 5;

    div {
        position: relative;
        top: 5px;
        font-size: 30px;
        font-weight: 500;
    }

    .title {
        left: 150px;
        font-weight: 700;
    }

    .ap {
        left: 620px;
    }

    .crash {
        left: 770px;
    }

    .stone {
        left: 860px;
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
