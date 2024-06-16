<script setup lang="ts">
import { inject } from 'vue';
import { getAvatarBg } from '@/assets/utils/api';
import CloseIcon from '../icons/CloseIcon.vue'
import { useGachaStore } from '@/stores/index'
const gachaStore = useGachaStore()
const hideModal = inject('hideHisModal') as Function
</script>

<template>
    <!-- History Modal begin -->
    <div class="modal-backdrop">
        <div class="modal history">
            <div class="modal-header">
                <span>招募记录</span
                ><button>?</button>
                <CloseIcon class="icon close" @click="hideModal()" />
            </div>
            <div class="modal-body">
                <div class="card" v-for="(item, index) in gachaStore.history" :key="index">
                    <div class="star"><img src="/Star.png" v-for="(_, index) in item['StarGrade']" :key="index"/></div>
                    <div class="char"><img :src="getAvatarBg(item.Id)" /></div>
                    <div class="name">{{ item['Name'] }} * {{ item['Cnt'] }}</div>
                </div>
            </div>
        </div>
    </div>
    <!-- History Modal end -->
</template>

<style scoped lang="scss">
@import '@/assets/styles/modal.scss';
@import '@/assets/styles/link-icon.scss';
</style>
