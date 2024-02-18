<script setup lang="ts">
import CloseIcon from './icons/CloseIcon.vue'
import { inject } from 'vue'
import i18n from '@/assets/utils/i18n'

const isModal = inject('isModal') as boolean[]
const hideModal = inject('hideModal') as Function

function switchLocale() {
    let list = i18n.global.availableLocales
    let index = list.findIndex((element) => element === i18n.global.locale.value)
    i18n.global.locale.value = list[(index + 1) % list.length]
}
</script>

<template>
    <!-- Setting Modal begin -->
    <div class="modal-backdrop" v-show="isModal[3]">
        <div class="modal setting">
            <div class="modal-header">
                <span>设置</span><button>?</button>
                <CloseIcon class="icon close" @click="hideModal(3)" />
            </div>
            <div class="modal-body"></div>
        </div>
    </div>
    <!-- Setting Modal end -->
</template>

<style scoped lang="scss">
@import '@/assets/styles/modal.scss';
@import '@/assets/styles/link-icon.scss';
</style>
