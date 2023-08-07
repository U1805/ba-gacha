<template>
    <div class="result">
        <div class="result-container">
            <div class="card pink" v-for="_ in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]">
                <div class="char">
                    <img
                        src="https://static.wikia.nocookie.net/blue-archive/images/9/96/Hanako_Swimsuit_Icon.png"
                    />
                </div>
                <div class="new"><img src="/New.png" /></div>
                <div class="star"><img src="/Star.png" v-for="_ in [1, 2, 3]" /></div>
            </div>
        </div>
        <div class="button-container">
            <div class="gacha-button button-blue">
                <div>确定</div>
            </div>
            <div class="gacha-button button-yellow">
                <div>再来一次</div>
            </div>
            <div class="point-container">
                <img src="/Point.png" />
                <div class="text"><span>招募点数</span></div>
                <div class="num"><span>60</span></div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/result-card.scss';

.result {
    @include center;
    flex-direction: column;
    @include full-screen;
    background: url(/Background.png);
    background-size: cover;
}

.result-container {
    @include center;
    flex-wrap: wrap;
    width: 70%;
}

.button-container {
    width: 40%;
    height: 8%;
    display: flex;
    justify-content: space-evenly;
    margin: 40px;

    .gacha-button {
        position: relative;
        overflow: hidden;
        box-shadow: 0px 5px 5px -5px rgb(0 0 0/0.6);
        @include skew;
        @include center;

        div {
            @include noskew;
            @include font-big;
        }
    }

    .button-blue {
        @include gacha-button($blue, '/ButtonBlueBg0.png', '/ButtonBlueBg1.png');
    }

    .button-yellow {
        @include gacha-button($golden, '/ButtonYellowBg0.png', '/ButtonYellowBg1.png');
    }
}
</style>
