<template>
  <div class="bacg-abs">
    <div class="player-main">
      <van-image
        id="player-back"
        src="http://cdn.jsdelivr.net/gh/zjkwdy/website-cdn/assets/images/other/playing_lp.png"
      />
      <van-image
        id="player-cover"
        class="rotage"
        src="http://cdn.jsdelivr.net/gh/zjkwdy/website-cdn/assets/images/other/playing_cover_lp.png"
      />
      <van-image
        class="rotage"
        id="player-veins"
        src="http://cdn.jsdelivr.net/gh/zjkwdy/website-cdn/assets/images/other/playing_veins_lp.png"
        alt=""
      />
      <!-- <van-image
        class="stylus_l"
        src="http://cdn.jsdelivr.net/gh/zjkwdy/website-cdn/assets/images/other/playing_stylus_lp.png"
        alt=""
      /> -->
      <!-- <van-image
      class="stylus_1"
        src="http://cdn.jsdelivr.net/gh/zjkwdy/website-cdn/assets/images/other/playing_stylus_lp_bg.png"
        alt=""
      /> -->
      <audio id="audio"></audio>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  setup () {

  },
  mounted () {
    console.log(this.$route.query.id)
  }
}
</script>

<style lang="scss" scoped>
.bacg-abs {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: white;
  background: rgb(98, 22, 36);
}
@keyframes roateZ {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}

@keyframes roateStylusOnDisk {
  100% {
    transform: rotateZ(8deg);
  }
}

@keyframes roateStylus {
  0% {
    transform: rotateZ(8deg);
  }
  100% {
    transform: rotateZ(28deg);
  }
}

@keyframes roateStylus2 {
  0% {
    transform: rotateZ(28deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}

.player {
  position: relative;
  transform-origin: center;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.player-stylus {
  position: absolute;
  transform-origin: 95px 57px;
  animation-timing-function: ease-in;
  left: 580px;
  z-index: 114514;
}

// #player-back {
//   background: url("http://cdn.jsdelivr.net/gh/zjkwdy/website-cdn/assets/images/other/playing_lp.png")
//     no-repeat;
//   background-size: 100% 100%;
//   top: 0;
//   left: 0;
//   position: absolute;
//   border-radius: 60px;
// }
.rotage {
  // position: relative;
  animation: roateZ 3s linear infinite;
  // transform-origin: center;
  // animation-iteration-count: infinite;
  // animation-timing-function: linear;
}

#player-veins {
  top: 0;
  left: 0;
  position: absolute;
}

#player-cover {
  z-index: 1000;
  top: 0;
  left: 0;
  position: absolute;
}

audio {
  display: none;
  width: 0px;
  height: 0px;
}
.stylus_l {
  position: absolute;
  transform: scale(0.6);
  top: -50%;
  right: 0;
}
.player-main {
  position: relative;
  margin-top: 64px;
}
</style>