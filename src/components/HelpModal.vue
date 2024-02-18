<script setup lang="ts">
import CloseIcon from './icons/CloseIcon.vue'
import { inject } from 'vue'

const isModal = inject('isModal') as boolean[]
const hideModal = inject('hideModal') as Function
</script>

<template>
    <!-- Setting Modal begin -->
    <div class="modal-backdrop" v-show="isModal[4]">
        <div class="modal history">
            <div class="modal-header">
                <span>帮助</span><button>?</button>
                <CloseIcon class="icon close" @click="hideModal(4)" />
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
