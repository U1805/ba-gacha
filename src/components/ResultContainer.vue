<script setup lang="ts">
import { useGachaStore } from '@/stores/index'
import { getAvatarNoBg } from '@/assets/utils/api'
const gachaStore = useGachaStore()

const colorTable: { [key: number]: string } = {
    1: 'blue',
    2: 'golden',
    3: 'pink'
}
</script>

<template>
    <!-- <div class="result">
        <div class="result-container">
            <div
                class="shadow-box"
                :class="{ shadow: item.StarGrade > 1 }"
                :key="index"
                v-for="(item, index) in gachaStore.gachaResult"
            >
                <div class="card" :class="colorTable[item.StarGrade]">
                    <div class="char"><img :src="getAvatarNoBg(item.Id)" /></div>
                    <div class="new" v-show="item['isNew']"><img src="/New.png" /></div>
                    <div class="star">
                        <img src="/Star.png" v-for="(_, index) in item.StarGrade" :key="index" />
                    </div>
                </div>
            </div>
        </div>
        <slot name="button-group"></slot>
    </div> -->
    <div class="result">
        <div class="result-container">
            <div
                class="card"
                :class="colorTable[item.StarGrade]"
                :key="index"
                v-for="(item, index) in gachaStore.gachaResult"
            >
                <div class="char"><img :src="getAvatarNoBg(item.Id)" /></div>
                <div class="new" v-show="item['isNew']"><img src="/New.png" /></div>
                <div class="star">
                    <img src="/Star.png" v-for="(_, index) in item.StarGrade" :key="index" />
                </div>
            </div>
        </div>
        <div class="shadow-container">
            <div class="shadow" :key="index" v-for="(item, index) in gachaStore.gachaResult">
                <div :class="colorTable[item.StarGrade]"></div>
            </div>
        </div>
        <slot name="button-group"></slot>
    </div>
</template>

<style scoped lang="scss">
.result {
    @include display-center;
    @include hw(45vw, 80vw);
    flex-direction: column;
    border-radius: 20px;
    background: url('/Background.png');
    background-size: cover;
    overflow: hidden;
}

.result-container {
    @include display-center;
    @include hw(50vw, 50vw);
    align-content: center;
    flex-wrap: wrap;
    z-index: 2;
}

.card {
    @include hw(26%, calc(20% - 40px));
    margin: 30px 20px;
    position: relative;
    border-radius: 10px;
    &.blue {
        box-shadow: 4px 4px 6px 2px $gray-shadow;
    }
    &.golden {
        box-shadow: 4px 2px 10px 8px $golden-shadow;
    }
    &.pink {
        box-shadow: 4px 2px 10px 8px $pink-shadow;
    }

    @include skew;

    .new {
        position: absolute;
        top: -10px;
        left: -10px;
        height: 25px;

        img {
            width: 50px;
            @include noskew;
        }
    }

    .char,
    .star {
        width: 100%;
        position: absolute;
        content: '';
        border: 3px solid white;
    }

    .char {
        @include display-center;
        top: 0;
        overflow: hidden;
        border-radius: 10px 10px 0 0;

        img {
            width: 100%;
            @include noskew;
        }
    }

    &.blue .char {
        background-color: $gray-card;
    }
    &.golden .char {
        background-color: $golden-card;
    }
    &.pink .char {
        background-color: $pink-card;
    }

    .star {
        @include display-center;
        height: 25%;
        bottom: 0;
        border-radius: 0 0 10px 10px;
        background-color: $black-main;

        img {
            width: 1.5vw;
            margin: 3px;
            @include noskew;
        }
    }
}

.shadow-container {
    @include display-center;
    @include hw(45vw, 50vw);
    position: absolute;
    align-content: center;
    flex-wrap: wrap;
    margin-top: -14vw;
    z-index: 1;
}

.shadow {
    @include skew;
    @include hw(26%, calc(20% - 40px));
    margin: 0 20px;
    position: relative;

    & .blue {
        position: absolute;
        width: calc(100% + 22px);
        height: 30vw;
    }

    & .golden {
        position: absolute;
        width: calc(100% + 22px);
        height: 30vw;
        background: linear-gradient(
            to top,
            rgb(255 255 255 / 0) 12.5%,
            rgb(250 250 250 / 0.3) 25%,
            rgb(245 245 245 / 0.7) 45%,
            rgb(255 255 255 / 0.9) 50%,
            rgb(245 245 245 / 0.7) 55%,
            rgb(250 250 250 / 0.3) 75%,
            rgb(255 255 255 / 0) 87.5%
        );
        animation: shadow2 5s cubic-bezier(0.65, 0.05, 0.36, 1) infinite;
    }

    & .pink {
        position: absolute;
        width: calc(100% + 22px);
        height: 30vw;
        background: linear-gradient(
            to top,
            rgb(211 225 250 / 0.2),
            rgb(245 228 252 / 0.65) 20%,
            rgb(250 250 250 / 0.9) 40%,
            rgb(255 255 255 / 1) 50%,
            rgb(250 250 250 / 0.9) 60%,
            rgb(245 228 252 / 0.65) 80%,
            rgb(211 225 250 / 0.2)
        );
        animation: shadow2 5s cubic-bezier(0.65, 0.05, 0.36, 1) infinite;
    }
}

@keyframes shadow2 {
    0% {
        height: 10vw;
    }
    50% {
        height: 23vw;
    }
    100% {
        height: 10vw;
    }
}
</style>
