<template>
    <div class="table-container">
        <div class="header"></div>
        <div class="preview">
            <video muted autoplay loop="true" height="100%">
                <source src="/Preview0.mp4" type="video/webm" />
            </video>
        </div>
        <div class="gradient"></div>
        <div class="gacha-wrapper">
            <div class="event-banner">
                <img src="/EventBanner0.png" height="100%">
                <img src="/EventBanner0.png" height="100%">
                <img src="/EventBanner1.png" height="100%">
            </div>
            <div class="event-scroll" style=""></div>

            <div class="tab-container" style="height: 75%;">
                <div class="tab-body">
                    <div class="time">2023/07/25 ~ 2023/08/01 11:00</div>
                    <div class="title">Fest Recruitment</div>
                    <div class="subtitle">Increased chance to get 3★ Mika!<br></div>
                    <div class="notice">One 2★ or higher student is guaranteed for every ten recruitments!<br>※ Students who
                        have already been recruited will be converted into Eligma and Eleph.</div>
                    <!-- Button-container begin -->
                    <div class="button-container">
                        <div class="gacha-button button-blue">
                            <img src="/Gacha0.png" class="gacha_icon">
                            <div class="right"><img src="/Stone_.png" class="stone_icon">
                                <div class="cost"> <span>120</span> </div>
                                <div class="text">Recruit 1</div>
                            </div>
                        </div>
                        <div class="gacha-button button-yellow">
                            <img src="/Gacha1.png" class="gacha_icon">
                            <div class="right"><img src="/Stone_.png" class="stone_icon">
                                <div class="cost "> <span>1200</span> </div>
                                <div class="text">Recruit 10</div>
                            </div>
                        </div>
                    </div>
                    <!-- Button-container end -->
                </div>
                <div class="tab-foot"><img src="/Point.png" draggable="false" class="point_icon">
                    <div class="text"> <span>Recruitment Points</span> </div>
                    <div class="point"> <span>60</span> </div>
                    <div class="select"> <span>Select Student</span> </div>
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
    background: url("/Header.png") top no-repeat;
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.441));
    background-size: contain;
    position: relative;
    z-index: 5;
}

.preview {
    grid-area: 1 / 1 / 3 / 2;
    height: 100vh;
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
        justify-content: space-between;
        height: 20%;
    }

    .event-scroll {
        background-color: #ffffffba;
        height: 3%;
        width: 10%;
        margin: 8px;
        border-radius: 20px;
    }
}
</style>