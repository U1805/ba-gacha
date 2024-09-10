<script setup lang="ts">
import ClickEffect from './components/ClickEffect.vue'
import { useGachaStore } from '@/stores/index'
import { onMounted } from 'vue'
import { non_limited_students } from './assets/data/non_limited_students';

const gachaStore = useGachaStore()
onMounted(async () => {
    gachaStore.getData()
    const non_limited_students_3star = 
        non_limited_students.filter(student => student['StarGrade'] === 3)
    gachaStore.setGacha(non_limited_students_3star)
})
</script>

<template>
    <div id="container">
        <RouterView />
    </div>
    <ClickEffect></ClickEffect>
    <video
        preload="auto" muted loop autoplay
        src="https://webusstatic.yo-star.com/bluearchive_jp_web/media/bg.555a8a72.mp4"
        class="top-bg"
    ></video>
    <img
        src="https://webusstatic.yo-star.com/bluearchive_jp_web/img/bg_cover.9bd1cfea.png"
        class="top-bg-cover"
    />
</template>

<style scoped lang="scss">
#container {
    z-index: 2;
    border: 10px solid #2a2a2a;
    border-radius: 30px;
    width: 80%;
    aspect-ratio: 16 / 9;
    background-color: white;
}

.top-bg {
    object-fit: cover;
    z-index: -1;
    @include hw-filled;
    @include position(0, auto, auto, 0);
    transform: translate(0);
    transition: opacity 0.3s ease;
    user-select: none;
}

.top-bg-cover {
    object-fit: cover;
    z-index: 1;
    @include hw-filled;
    @include position(0, auto, auto, 0);
    transform: translate(0);
    transition: opacity 0.3s ease;
    user-select: none;
}
</style>
