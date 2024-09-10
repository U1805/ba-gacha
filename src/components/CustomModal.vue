<script lang="ts">
import { defineComponent } from "vue";
import CloseIcon from "./icons/CloseIcon.vue";

export default defineComponent({
    components: { CloseIcon },
    name: "CustomModal",
    props: {
        modelValue: Boolean,
        title: String,
        footer: {
            type: Boolean,
            default: false,
        },
        width: {
            type: String,
            default: "60vw",
        },
        height: {
            type: String,
            default: "40vw",
        },
        zIndex: {
            type: Number,
            default: 1000,
        },
    },
    emits: ["ok", "close", "update:modelValue"],
    setup(props, { emit }) {
        const closeModal = (type: string) => {
            emit("update:modelValue", false);
            emit("close", type);
        };
        const sure = () => {
            emit("update:modelValue", false);
            emit("ok");
        };
        return { closeModal, sure };
    },
});
</script>

<template>
    <Teleport to="body">
        <div class="modal-backdrop" v-show="modelValue" :style="{ zIndex: zIndex }">
            <div class="modal" :style="{ width: width, height: height }">
                <div class="modal-header">
                    <span>{{ title }}</span
                    ><button>?</button>
                    <CloseIcon class="icon close" @click="closeModal('close')" />
                </div>
                <div class="modal-body" :class="{ 'modal-body--filled': !footer }">
                    <slot></slot>
                </div>
                <div class="modal-footer" v-if="footer">
                    <div class="gacha-button button-gray" @click="closeModal('cancel')">
                        <div>取消</div>
                    </div>
                    <div class="gacha-button button-blue" @click="sure()">
                        <div>确定</div>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped lang="scss">
@import '@/assets/styles/modal.scss';
</style>
