<script setup lang="ts">
import MainContainer from './components/MainContainer.vue'
import ResultContainer from './components/ResultContainer.vue'
</script>

<template>
    <MainContainer style="position: absolute; z-index: 10"></MainContainer>
    <VideoContainer style="position: absolute; z-index: 20"></VideoContainer>
    <ResultContainer style="position: absolute; z-index: 30"></ResultContainer>
</template>

<style scoped lang="scss"></style>
