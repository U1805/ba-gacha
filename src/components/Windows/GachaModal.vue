<script setup lang="ts">
import CloseIcon from '../icons/CloseIcon.vue'
import { useGachaStore } from '@/stores'
import { useRouter } from 'vue-router'
import { inject } from 'vue'

const router = useRouter()

const gachaStore = useGachaStore()
const hideModal = inject('hideModal') as Function

function getStudents(num: number) {
    hideModal()
    gachaStore.gachaStudents(num)
    router.push('/gacha')
}
</script>

<template>
    <div class="modal-backdrop">
        <div class="modal">
            <div class="modal-header">
                <span>通知</span><button>?</button>
                <CloseIcon class="icon close" @click="hideModal()" />
            </div>
            <div class="modal-body">
                <slot name="body"></slot>
                <div style="margin: 20px 0; font-weight: 500; font-size: 20px;">
                    青耀石消耗数量
                </div>
                <div class="point-container">
                    <img src="/Stone.png" />
                    <div class="num">
                        <span>{{ gachaStore.lastGachaNum*120 }}</span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="gacha-button button-gray" @click="hideModal()">
                    <div>取消</div>
                </div>
                <div class="gacha-button button-blue" @click="getStudents(gachaStore.lastGachaNum)">
                    <div>确定</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/modal.scss';

.modal-backdrop {
    @include position(0, 0, 0, 0);
}
</style>
