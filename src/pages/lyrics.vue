<template>
  <div class="bacg-abs" v-if="resShow">
    <div class="player-main">
      <van-image
        id="player-back"
        class="record"
        src="http://cdn.jsdelivr.net/gh/zjkwdy/website-cdn/assets/images/other/playing_lp.png"
      />
      <div id="player-cover">
        <van-image
          round
          id="rotage"
          class="record"
          fit="contain"
          :src="song.al.picUrl"
        />
      </div>

      <van-image
        class="record"
        id="player-veins"
        src="http://cdn.jsdelivr.net/gh/zjkwdy/website-cdn/assets/images/other/playing_veins_lp.png"
        alt=""
      />
      <van-image
        class="stylus_l"
        src="http://cdn.jsdelivr.net/gh/zjkwdy/website-cdn/assets/images/other/playing_stylus_lp.png"
        alt=""
      />
      <!-- <van-image
      class="stylus_1"
        src="http://cdn.jsdelivr.net/gh/zjkwdy/website-cdn/assets/images/other/playing_stylus_lp_bg.png"
        alt=""
      /> -->
      <audio autoplay ref="audioPlay" :src="currentMp3" controls></audio>

      <div class="lyric_area">
        <div>{{ song.name }}</div>
        <div>专辑：{{ song.al.name }}</div>
        <div>
          歌手：<span v-for="(item, index) in song.ar">{{ item.name }}·</span>
        </div>
        <ul class="lyric-ar" ref="lyric">
          {{
            currentLyric
          }}
        </ul>
        <van-slider
          v-model="playTime"
          bar-height="4px"
          @change="onChange"
          active-color="#ee0a24"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { GET_LYRIC, GET_SONG, SONGS_DETAIL } from "../api/index.js";
import { formlrc,transfromTimeToMins } from "@/utils"
import { useRoute } from "vue-router";
import { ref } from 'vue'
export default {
  data () {
    return {
      lyric: [],
      currentPlay: '',
      PlayLyric: [],
      currentMp3: '',
      audioShow: false,
      song: {},
      resShow: false,
      currentLyric: '',
      playTime: 0
    }
  },
  setup () {
    const currentMp3 = useRoute().query.mp3
    const info = useRoute().query.playInfo
    var audioPlay = ref(null)
    // const lyric = ref(null)
    console.log(info)
    return { info, audioPlay, currentMp3 }
  },
  mounted () {
    function arrout (arr) {
      let arrout = [[]]
      arr.forEach((element, index) => {
        let sum = index
        element.forEach((ele, i) => {
          if (i + index === index) {
            arrout.push(ele)
            if (index !== 0) {
              for (let index_ = 0; index_ < Math.abs(index - i) - 1; index_++) {
                arrout.push(arr[index - index_][index_ + index])
              }
            }
          }
        })
      })
      return arrout
    }
    SONGS_DETAIL(useRoute().query.id).then(res => {
      this.song = res.data.songs[0]
      this.resShow = true
      console.log(this.song)
    })
    // console.log(this.makeDurationToSeconds(this.ts))
    GET_LYRIC(this.$route.query.id).then(res => {
      // console.log(res.data.lrc.lyric)
      this.lyric = formlrc(res.data.lrc.lyric)
      // console.log(this.lyric)
      // this.currentLyric = this.lyric[0].lrc
      this.getTime()
    })
  },
  methods: {
    sortRule (a, b) {
      return a.time - b.time;
    },
    onChange() {
      this.getCurrentMediaPlayTime()
    },

    getTime () {
      let that = this
      console.log(this.audioPlay)
      this.audioPlay.ontimeupdate = function () {
        let curTime = that.audioPlay.currentTime
        that.lyric.forEach((element, index) => {
          let index__ = that.lyric
          let curn = parseFloat(that.audioPlay.currentTime.toFixed(1))
          if (curn >= index__[index].time - 0.5 && curn <= index__[index + 1].time) {
            that.currentLyric = element.lrc
          }
        })
        that.setPlayButtomAnim(parseInt(parseInt(curTime)/that.lyric[that.lyric.length -2].time * 100))
      }
    },
    setPlayButtomAnim(time) {
      this.playTime = time
    },

    getCurrentMediaPlayTime() {
      let curPlay = parseInt(this.audioPlay.currentTime)
      let allTime = this.lyric[this.lyric.length -2].time
      let suoudTime = this.playTime / 100 * allTime
      this.audioPlay.currentTime = suoudTime
    },
    mainLy () {
      var lineNo = 0
      var C_pos = 6
      var offset = -20
      var audio = this.audioPlay
      var ul = this.lyric

    },

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

#player-back {
  background: url("http://cdn.jsdelivr.net/gh/zjkwdy/website-cdn/assets/images/other/playing_lp.png")
    no-repeat;
  background-size: 100% 100%;
  top: 0;
  left: 0;
  position: absolute;
  border-radius: 60px;
  z-index: 3000;
}
#rotage {
  // position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40%;
  width: 40%;
  animation: roateZ 5s linear infinite;
  // transform-origin: center;
  // animation-iteration-count: infinite;
  // animation-timing-function: linear;
}

#player-veins {
  // z-index: 2000;
  top: 0;
  left: 0;
  position: absolute;
}

#player-cover {
  display: flex;
  height: 100vw;
  width: 100vw;
  z-index: 1000;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  // position: absolute;
  // top: 0;
  // left: 0;
  // margin-top: 50%;
  // transform: translate(-50%,-50%);
  // translate: scale(0.4);
}

audio {
  display: none;
  width: 0px;
  height: 0px;
}
.stylus_l {
  position: absolute;
  transform: scale(0.6);
  top: -38%;
  right: 0;
  z-index: 3000;
}
.player-main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  margin-top: 64px;
}
.record {
  height: 100vw;
  width: 100vw;
}
.lyric_area {
  // height: 300px;
  // overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 70%;
}
#lyric {
  line-height: 20px;
  transition-duration: 600ms;
}
#lyric .lineHigh {
  color: red;
}
.lyric-ar {
  height: 128px;
  font-size: 24px;
  margin: 16px;
}
</style>