<script setup lang="ts">
import { inject } from 'vue';
import CloseIcon from '../icons/CloseIcon.vue'
const hideModal = inject('hideHelpModal') as Function
</script>

<template>
    <div class="modal-backdrop">
        <div class="modal history">
            <div class="modal-header">
                <span>帮助</span><button>?</button>
                <CloseIcon class="icon close" @click="hideModal()" />
            </div>
            <div class="modal-body"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/modal.scss';
</style>
