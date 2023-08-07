<template>
    <div class="table-container">
        <div class="header">
            <div class="title">学生招募</div>
            <div class="ap">999/999</div>
            <div class="crash">999,999,999</div>
            <div class="stone">999,999</div>
        </div>
        <div class="preview">
            <video muted autoplay loop="true">
                <source src="/Preview0.mp4" type="video/webm" />
            </video>
        </div>
        <div class="gradient"></div>
        <div class="gacha-wrapper">
            <div class="event-banner">
                <img src="/EventBanner0.png">
                <img src="/EventBanner0.png">
                <img src="/EventBanner1.png">
            </div>
            <div class="event-scroll">
                <span class="dot active"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>

            <div class="tab-container">
                <div class="tab-body">
                    <div class="duration">07/25/2023 From 10:00 ~ 08/01/2023 Until 09:59</div>
                    <div class="title">Fest Recruitment</div>
                    <div class="subtitle">Increased chance to get 3★ Mika!<br></div>
                    <div class="notice">One 2★ or higher student is guaranteed for every ten recruitments!<br>※ Students who
                        have already been recruited will be converted into Eligma and Eleph.</div>
                    <!-- Button-container begin -->
                    <div class="button-container">
                        <div class="gacha-button button-blue">
                            <img src="/Gacha0.png" class="gacha_icon">
                            <div class="right"><img src="/Stone.png" class="stone_icon">
                                <div class="cost"> <span>120</span> </div>
                                <div class="text">招募 1 次</div>
                            </div>
                        </div>
                        <div class="gacha-button button-yellow">
                            <img src="/Gacha1.png" class="gacha_icon">
                            <div class="right"><img src="/Stone.png" class="stone_icon">
                                <div class="cost "> <span>1200</span> </div>
                                <div class="text">招募 10 次</div>
                            </div>
                        </div>
                    </div>
                    <!-- Button-container end -->
                </div>
                <div class="tab-foot"><img src="/Point.png" draggable="false" class="point_icon">
                    <div class="text"> <span>招募点数</span> </div>
                    <div class="point"> <span>60</span> </div>
                    <div class="select"> <span>重置</span> </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<style scoped lang="scss">
@import '@/assets/styles/gacha-tab.scss';

.table-container {
    display: grid;
    grid-template-columns: 45vw 55vw;
    grid-template-rows: $header_hight 1fr;

    background: url("/Background.png") no-repeat;
    overflow: hidden;
}

.header {
    grid-area: 1 / 1 / 2 / 3;
    display: flex;
    background: url("/Header.png") top no-repeat;
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.441));
    background-size: contain;
    position: relative;
    z-index: 5;

    div {
        position: relative;
        top: 5px;
        font-size: 30px;
        font-weight: 500;
    }

    .title {
        left: 150px;
        font-weight: 700;
    }

    .ap {
        left: 620px;
    }

    .crash {
        left: 770px;
    }

    .stone {
        left: 860px
    }
}

.preview {
    grid-area: 1 / 1 / 3 / 2;
    height: 100vh;

    video {
        height: 100%;
    }
}

.gradient {
    grid-area: 1 / 2 / 3 / 3;
    display: flex;
    height: 100vh;
    position: relative;
    width: 120%;
    z-index: 3;
    content: url("/Background.png");
    mask-image: linear-gradient(to left, #fff 70%, transparent 100%);
    -webkit-mask-image: linear-gradient(to left, #fff 70%, transparent 100%);
}

.gacha-wrapper {
    grid-area: 1 / 2 / 3 / 3;
    height: 100vh;
    z-index: 4;
    padding: 160px 40px 120px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
        width: 100%;
    }

    .event-banner {
        display: flex;
        justify-content: flex-start;
        height: 20%;

        overflow: hidden;

        img {
            height: 100%;
            margin: 0 5px;
        }
    }

    .event-scroll {
        background-color: #ffffffba;
        height: 2%;
        width: fit-content;
        padding: 0 10px;
        margin: 8px;
        border-radius: 20px;
        @include center;

        .dot {
            cursor: pointer;
            height: 5px;
            width: 5px;
            margin: 0 2px;
            background-color: $black-shadow;
            border-radius: 50%;
            display: inline-block;
            transition: background-color 0.6s ease;
        }

        .active,
        .dot:hover {
            background-color: $blue;
        }
    }

    .tab-container {
        height: 75%;
    }
}
</style>