<script setup lang="ts">
import { inject } from 'vue';
import CloseIcon from '../icons/CloseIcon.vue'
const hideModal = inject('hideHelModal') as Function
</script>

<template>
    <!-- Setting Modal begin -->
    <div class="modal-backdrop">
        <div class="modal history">
            <div class="modal-header">
                <span>帮助</span><button>?</button>
                <CloseIcon class="icon close" @click="hideModal()" />
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
