<script setup lang="ts">
import CloseIcon from './icons/CloseIcon.vue'
import { inject } from 'vue'
import { store } from '@/assets/utils/store'
import { getSchaledbAvatar, getSchaledbInfo } from '@/assets/utils/api'

const isModal = inject('isModal') as boolean[]
const hideModal = inject('hideModal') as Function
</script>

<template>
    <!-- History Modal begin -->
    <div class="modal-backdrop" v-show="isModal[2]">
        <div class="modal history">
            <div class="modal-header">
                <span>{{ $t('history') }}</span
                ><button>?</button>
                <CloseIcon class="icon close" @click="hideModal(2)" />
            </div>
            <div class="modal-body">
                <div class="card" v-for="item in store.history">
                    <a :href="getSchaledbInfo(item['PathName'])" target="_blank">
                        <div class="star"><img src="/Star.png" v-for="_ in item['StarGrade']" /></div>
                        <div class="char"><img :src="getSchaledbAvatar(item['Id'].toString())" /></div>
                        <div class="name">{{ item['Name'] }} * {{ item['Cnt'] }}</div>
                    </a>
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
