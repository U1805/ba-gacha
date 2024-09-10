<script setup lang="ts">
import { inject } from 'vue';
import CloseIcon from '../icons/CloseIcon.vue'
const hideModal = inject('hideProbModal') as Function
</script>

<template>
    <div class="modal-backdrop">
        <div class="modal history">
            <div class="modal-header">
                <span>概率情报</span><button>?</button>
                <CloseIcon class="icon close" @click="hideModal()" />
            </div>
            <div class="modal-body"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/modal.scss';
</style>
