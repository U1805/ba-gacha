<script setup lang="ts">
import CloseIcon from '../icons/CloseIcon.vue'
import { useGachaStore } from '@/stores';
import { inject, defineProps } from 'vue'

const gachaStore = useGachaStore()
const hideModal = inject('hideModal') as Function

function getStudents(num: number) {
    hideModal()
    gachaStore.gachaStudents(num)
    gachaStore.changeVisible(1)
}

const props = defineProps(["num"])
</script>

<template>
    <!-- Gacha Modal begin -->
    <div class="modal-backdrop">
        <div class="modal">
            <div class="modal-header">
                <span>通知</span><button>?</button>
                <CloseIcon class="icon close" @click="hideModal()" />
            </div>
            <div class="modal-body">
                <slot name="body"></slot>
            </div>
            <div class="modal-footer">
                <div class="gacha-button button-gray" @click="hideModal()">
                    <div>取消</div>
                </div>
                <div class="gacha-button button-blue" @click="getStudents(props.num)">
                    <div>确定</div>
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
