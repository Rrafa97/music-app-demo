<template>
  <div class="bacg-abs" v-if="resShow">
    <div class="player-main">
      <van-image
        id="player-back"
        class="record"
        src="http://cdn.jsdelivr.net/gh/zjkwdy/website-cdn/assets/images/other/playing_lp.png"
      />
      <div id="player-cover">
        <van-image round id="rotage" class="record" fit="contain" :src="ad" />
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
      <audio autoplay ref="audioPlay" controls>
        <source :src="currentMp3" type="audio/mpeg" />
      </audio>
      <div class="lyric_area">
        <ul class="lyric" ref="lyric">
          {{
            currentLyric
          }}
        </ul>
        <ul ref="lyric">
          {{
            currentLyric
          }}
        </ul>
        <ul ref="lyric">
          {{
            currentLyric
          }}
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_LYRIC, GET_SONG, SONGS_DETAIL } from "../api/index.js";
import { formlrc } from "@/utils"
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
    }
  },
  watch: {
    // lyricCurrent () {
    //   this.lyric.forEach((element, index) => {
    //     if (this.lyricCurrent == element.time) {
    //       this.lyricMove.top = -index * 2.5 + 6 + "rem";
    //       this.currentRow = index; //通过比较我们歌词属性里的时间与当前播放时间，来定位到该歌词
    //     }
    //   });
    // }
  },
  setup () {
    const currentMp3 = useRoute().query.mp3
    const info = useRoute().query.playInfo
    const audioPlay = ref(null)
    const lyric = ref(null)
    var currentLyric = ''
    var resShow = true
    let song = {}
    SONGS_DETAIL(useRoute().query.id).then(res => {
      song = res.data.songs[0]
      resShow = true
      console.log(song)
    })
    console.log(info)
    return { info, currentMp3, song, resShow, audioPlay, lyric, currentLyric }
  },
  mounted () {
    // console.log(this.makeDurationToSeconds(this.ts))
    this.getTime()
    GET_LYRIC(this.$route.query.id).then(res => {
      this.lyric = formlrc(res.data.lrc.lyric)
      console.log(this.lyric[0].lrc)
      this.currentLyric = this.lyric[0].lrc
    })
  },
  methods: {
    sortRule (a, b) {
      return a.time - b.time;
    },
    getTime () {
      setInterval(() => {
        // console.log(this.audioPlay.currentTime)
      }, 3000);
      let that = this
      this.audioPlay.ontimeupdate = function () {
        // console.log(that.audioPlay.currentTime)
      }
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
  height: 300px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 15px;
}
#lyric {
  line-height: 20px;
  transition-duration: 600ms;
}
#lyric .lineHigh {
  color: red;
}
.lyric {
  font-size: 24px;
  margin: 16px;
}
</style>