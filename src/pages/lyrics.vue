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
      <audio autoplay ref="audio" controls>
        <source :src="currentMp3" type="audio/mpeg" />
      </audio>
    </div>
  </div>
</template>

<script>
import { GET_LYRIC, GET_SONG, SONGS_DETAIL } from "../api/index.js";
import { formlrc } from "@/utils"
import { useRoute } from "vue-router";
export default {
  data () {
    return {
      lyric: [],
      currentPlay: '',
      PlayLyric: [],
      currentMp3: '',
      audioShow: false,
      ad: "https://p2.music.126.net/6foZcR0P2Pdw0HRIdV1aiQ==/109951165914949830.jpg"
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
    var resShow = true
    let song = {}
    SONGS_DETAIL(useRoute().query.id).then(res => {
      song = res.data.songs[0]
      resShow = true
      console.log(song)
    })
    console.log(info)
    return { info, currentMp3, song, resShow }
  },
  mounted () {
    // let te = "[00:00.000] 作词 : 吕易秋@SBMS Beijing↵[00:01.000] 作曲 : 郑楠@SBMS Beijing↵[00:02.000] 编曲 : 郑楠@SBMS Beijing↵[00:03.000] 制作人 : 郑楠@SBMS Beijing↵[00:18.803]数不尽 浩瀚的天体↵[00:22.868]银河是 梦想的轨迹↵[00:27.220]星光温暖 了↵[00:31.738]最渺小的 我↵[00:36.322]亿万个 人类的梦里↵[00:40.239]寄宿着 亿万个神明↵[00:44.809]痴心妄想 过↵[00:49.077]才会成真 呢↵[00:53.896]遥不可及 那朵流星 在深夜里↵[01:00.234]赐予天际 刹那的美丽↵[01:04.540]让这世界 都鲜活↵[01:10.783]我热爱 布满荆棘的生命↵[01:15.918]看平凡闪烁出奇迹↵[01:20.501]这刺破黑暗的火花↵[01:27.444]让我还奔跑着↵[01:29.245]想拥抱 炽热的繁星↵[01:33.360]哪怕注定燃烧殆尽↵[01:37.936]就这样固执不悔改↵[01:43.257]永不停歇的热爱（Whoa）↵[01:53.671]永不停歇的热爱（Whoa）"
    console.log(this.$route.query.id)
    // GET_SONG(this.$route.query.id).then(res => {
    //   this.currentMp3 = res.data.data[0].url
    //   this.audioShow = true
    //   console.log(res.data.data[0].url)
    // })
    GET_LYRIC(this.$route.query.id).then(res => {
      this.lyric = formlrc(res.data.lrc.lyric)
      // console.log(this.lyric)
    })
  },
  methods: {
    sortRule (a, b) {
      return a.time - b.time;
    }

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
  top: -50%;
  right: 0;
  z-index: 3000;
}
.player-main {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 64px;
}
.record {
  height: 100vw;
  width: 100vw;
}
</style>