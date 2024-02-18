<script setup lang="ts">
import CloseIcon from './icons/CloseIcon.vue'
import type { Gacha } from '@/assets/utils/gacha'
import { inject } from 'vue'

const gacha = inject('gacha') as Gacha
const isModal = inject('isModal') as boolean[]
const changeVisible = inject('changeVisible') as Function
const hideModal = inject('hideModal') as Function

function getStudents(num: number) {
    gacha.getStudents(num)
    changeVisible(0)
    changeVisible(1)
}
</script>

<template>
    <!-- Gacha Modal begin -->
    <div class="modal-backdrop" v-show="isModal[index]" v-for="(num, index) in [1, 10]">
        <div class="modal">
            <div class="modal-header">
                <span>{{ $t('modalTitle') }}</span
                ><button>?</button>
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
</template>

<style scoped lang="scss">
@import '@/assets/styles/modal.scss';
@import '@/assets/styles/link-icon.scss';
</style>
