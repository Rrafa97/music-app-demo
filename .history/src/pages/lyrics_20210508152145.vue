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
          ref="rotage"
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
        class="stylus_l record-arm"
        @touchmove="touchmove"
        @touchstart="touchstart"
        @touchend="touchend"
        ref="recordArm"
        id="recordArm"
        src="http://cdn.jsdelivr.net/gh/zjkwdy/website-cdn/assets/images/other/playing_stylus_lp.png"
        alt=""
      />
      <!-- <van-image
      class="stylus_1"
        src="http://cdn.jsdelivr.net/gh/zjkwdy/website-cdn/assets/images/other/playing_stylus_lp_bg.png"
        alt=""
      /> -->
      <audio loop autoplay ref="audioPlay" :src="currentMp3" controls></audio>
      <!-- <div :style="{ height: '8rem',position:'fixed',bottom: '6rem',left: '0em',transform: 'rotate(180deg)',background: 'rgba(0,0,0,.5)',padding:'1rem' }">
        <van-slider :style="{transform: 'rotate(180deg)'}" v-model="vosalue" bar-height=".3rem"  active-color="#ee0a24" vertical @change="onChangevos" />
      </div> -->
      <div class="lyric_area">
        <div>{{ song.name }}</div>
        <div>专辑：{{ song.al.name }}</div>
        <van-notice-bar
          speed="10"
          scrollable
          :text="'专辑：' + song.al.name"
        />
        <!-- <div>
          歌手：<span v-for="(item, index) in song.ar">{{ item.name }}·</span>
        </div> -->
        <ul class="lyric-ar" ref="lyric">
          {{
            currentLyric
          }}
        </ul>
        <van-slider
          v-model="playTime"
          bar-height=".26rem"
          @change="onChange"
          @update:model-value="onUpdate"
          active-color="#ee0a24"
        />
        <van-divider
          :style="{ color: '#fff', borderColor: '#1989fa', padding: '0 16px' }"
          content-position="right"
          >{{ showPlayTime }}</van-divider
        >
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { GET_LYRIC, GET_SONG, SONGS_DETAIL } from "../api/index";
import { formlrc, transfromTimeToMins } from "@/utils"
import { useRoute } from "vue-router";
import { onMounted, ref } from 'vue'
export default {
  name: 'lyrics',
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
      playTime: 0,
      showPlayTime: '',
      nolyric: false,
      startPoint: [],
      endPoint: [],
      vosalue: ''
    }
  },
  setup () {
    const currentMp3 = useRoute().query.mp3
    const info = useRoute().query.playInfo
    var audioPlay = ref(null)
    var recordArm = ref(null)
    var rotage = ref(null)
    function add() {
      recordArm.value ++
    }
    onMounted(() => {
    })
    return { info, audioPlay, currentMp3, recordArm,add,rotage }
  },
  mounted () {
    SONGS_DETAIL(useRoute().query.id).then(res => {
      this.song = res.data.songs[0]
      this.resShow = true
    })
    GET_LYRIC(this.$route.query.id).then(res => {
      if (res.data.nolyric === true) {
        this.currentLyric = '纯音乐，无歌词'
      } else {
        this.lyric = formlrc(res.data.lrc.lyric)
        // console.log(res.data.lrc.lyric)
      }
      this.getTime()
    })
  },
  methods: {
    sortRule (a, b) {
      return a.time - b.time;
    },
    onChange () {
      this.getCurrentMediaPlayTime()
    },
    onUpdate() {
      // console.log(this.playTime)
      this.getCurrentMediaPlayTime()
    },

    getTime () {
      let that = this
      this.audioPlay.canPlay = setTimeout(() => {
        canPlay()
      }, 500);
      function canPlay () {
        that.audioPlay.ontimeupdate = function () {
          let curTime = that.audioPlay.currentTime
          that.lyric.forEach((element, index) => {
            let index__ = that.lyric
            let curn = parseFloat(that.audioPlay.currentTime.toFixed(1))
            if (curn >= index__[index].time - 0.1 && curn <= index__[index + 1].time) {
              if (element.lrc === '' || element.lrc === undefined || element.lrc === null) {
                // that.currentLyric = ''
                this.nolyric = true
              } else {
                that.currentLyric = element.lrc
              }

            }
          })
          that.setPlayButtomAnim(parseInt(parseInt(curTime) / that.lyric[that.lyric.length - 2].time * 100))
          that.setShowPlayTime(curTime)
        }
      }
    },
    setPlayButtomAnim (time) {
      this.playTime = time
    },
    setShowPlayTime (time) {
      this.showPlayTime = transfromTimeToMins(time)
    },
    getCurrentMediaPlayTime () {
      let curPlay = parseInt(this.audioPlay.currentTime)
      let allTime = this.lyric[this.lyric.length - 2].time
      let suoudTime = this.playTime / 100 * allTime
      this.audioPlay.currentTime = suoudTime
    },
    onChangevos() {},
    mainLy () {
      var lineNo = 0
      var C_pos = 6
      var offset = -20
      var audio = this.audioPlay
      var ul = this.lyric

    },
    touchstart (e) {
      let startPoint = [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      // console.log(startPoint)
      this.startPoint = startPoint
      // this.stylus.style.left = '32px'
      // console.log(this.stylus.style)
      this.setStylusCla()
    },
    touchmove (e) {
      let line = e.changedTouches[0].clientX - this.startPoint[0]
      // console.log(e.changedTouches[0].clientX - this.startPoint[0])
      if (parseInt(line / 5.34) < 10 && parseInt(line / 5.34) > -10) {
        let sr = 'scale(0.6) rotate(' + -parseInt(line / 5) + 'deg)'
        this.recordArm.$el.style.transform = sr
        // document.getElementById('recordArm').style.transform = sr
      }
    },
    touchend (e) {
      this.endPoint = [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      if (this.startPoint[0] - this.endPoint[0] > 10) {
        // console.log('播放')
      } else if (this.endPoint[0] - this.startPoint[0] > 10) {
        // console.log('放开')
      }
    },
    setStylusCla () {
      if (this.audioPlay.paused) {
        this.recordArm.$el.style.transform = 'scale(0.6) '
        this.rotage.$el.style.animationPlayState = 'running'
        this.audioPlay.play()
      } else {
        this.recordArm.$el.style.transform = 'scale(0.6) rotate(-10deg)'
        this.rotage.$el.style.animationPlayState = 'paused'
        this.audioPlay.pause()
      }

    }
  }
}
</script>

<style lang="less" scoped>
.bacg-abs {
  position: fixed;
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
  animation: roateZ 15s linear infinite;
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

.animasion-pause {
  animation-play-state: paused;
}

.animasion-play {
  animation-play-state: running;
}

audio {
  display: none;
  width: 0px;
  height: 0px;
}
.stylus_l {
  position: absolute;
  transform: scale(0.6);
  top: -18%;
  // height: 60%;
  // width: 60%;
  right: 16%;
  z-index: 3000;
  transition: 0.3s;
  transform-origin: right top;
}
.player-main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  // margin-top: 64px;
}
.record {
  height: 100vw;
  width: 100vw;
}
.lyric_area {
  // height: 300px;
  // overflow: hidden;
  font-size: 0.6rem;
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
  text-align: center;
  vertical-align: middle;
  height: 2.4rem;
  font-size: 1.2rem;
  line-height: 1.3rem;
  // white-space: nowrap;
  margin: 0.2rem 0;
}
</style>