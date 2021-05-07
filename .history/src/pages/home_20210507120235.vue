<template>
  <div class="main-color">
    <!-- <div
      class="block"
      @touchstart="touchstart"
      @touchend="touchend"
      v-if="homeAdShow"
    >
      <el-carousel height="100vh" ref="carousel" :loop="false">
        <el-carousel-item v-for="(item, index) in imgurl" :key="item">
          <el-image
            style="width: 100%"
            :src="item"
            @click="adClick(index)"
          ></el-image>
        </el-carousel-item>
      </el-carousel>
      <div class="background"></div>
    </div> -->
    <!-- <van-field class="main-color" v-model="state.text" label="输入搜索歌曲" /> -->

    <van-sticky :offset-top="0" position="top">
      <van-field
        v-model="state.text"
        center
        clearable
        placeholder="输入搜索歌曲"
        class="serch-box"
      >
        <template #button>
          <van-button size="small" type="danger" @click="serch"
            >搜索</van-button
          >
        </template>
      </van-field>
    </van-sticky>

    <!-- <van-button type="danger" @click="serch">搜索</van-button> -->
    <div v-for="(index, item) in songs" key="item">
      <!-- <van-card
        v-if="cardShow"
        :desc="'艺术家：' + index.artists[0].name"
        :title="'歌曲名:  ' + index.name"
        :thumb="index.artists[0].img1v1Url"
        @click="getSong(index.id)"
      />
     -->
      <van-card
        v-if="cardShow"
        :desc="'艺术家：' + index.ar[0].name"
        :title="index.name"
        :thumb="index.al.picUrl"
        :centered="false"
        @click="getSong(index.id, index)"
        class="main-color"
      >
        <template #tags>
          <van-tag class="main-color" plain type="danger"
            >专辑：{{ index.al.name }}</van-tag
          >
        </template>
      </van-card>
    </div>
    <!-- <van-popup
      v-model:show="popShow"
      position="bottom"
      :style="{ height: '10%' }"
    >
      <audio v-if="playShow" controls>
        <source :src="currentMp3" type="audio/mpeg" />
      </audio>
    </van-popup> -->
    <van-sticky v-if="popShow" :offset-bottom="0" position="bottom">
      <div class="mask-play">
        <p @click="toSongs">
          {{
            "‘" +
            playInfo.name +
            "’" +
            "-" +
            playInfo.ar[0].name +
            "——专辑:" +
            playInfo.al.name
          }}
        </p>
        <audio v-if="playShow" ref="audio" controls>
          <source :src="currentMp3" type="audio/mpeg" />
        </audio>
      </div>
    </van-sticky>
    <playlist-hot></playlist-hot>
  </div>
</template>

<script lang="js">
import { SERCH_KEY, SERCH_HOT, GET_SONG } from "../api/index";
import { reactive, ref, provide } from "vue";
// import playlisthot from '@/pages/playlist_hot.vue'
// import playsmall from "@/pages/playsmall";
export default {
  name: 'home',
  // components: {"playlist-hot":playlist_hot},
  data() {
    return {
      imgurl: [
        require("@/assets/images/home_ad1.png"),
        require("@/assets/images/home_ad2.png"),
        require("@/assets/images/home_ad3.png"),
      ],
      startPoint: [],
      endPoint: [],
      homeAdShow: false,
      text: "",
      songs: [],
      cardShow: false,
      playShow: false,
      currentMp3: "",
      popShow: false,
      // playInfo: false,
    };
  },
  components: {
    // playsmall,
  },
  setup() {
    const state = reactive({
      tel: "",
      text: "",
      digit: "",
      number: "",
      password: "",
    });
    var playInfo = false;
    const audio = ref(null);
    SERCH_HOT().then((res) => {
      state.text = res.data.result.hots[0].first;
    });
    return { audio, state, playInfo };
  },
  methods: {
    touch() {},
    touchstart(e) {
      // 如果你要阻止点击事件，请反注释下一行代码this
      // e.preventDefault()
      this.startX = e.changedTouches[0].clientX;
      this.startY = e.changedTouches[0].clientY;
      this.startPoint = [
        e.changedTouches[0].clientX,
        e.changedTouches[0].clientY,
      ];
      return e;
    },
    touchstartRes() {},
    touchend(e) {
      this.touchstartRes();
      this.endPoint = [
        e.changedTouches[0].clientX,
        e.changedTouches[0].clientY,
      ];
      this.endPoint[0] - this.startPoint[0] > 20
        ? this.$refs.carousel.prev()
        : false;
      this.endPoint[0] - this.startPoint[0] < -20
        ? this.$refs.carousel.next()
        : false;
    },
    serch() {
      if (this.state.text === "") {
        this.$toast.fail("输入关键词");
      } else {
        SERCH_KEY(this.state.text).then((res) => {
          this.songs = res.data.result.songs;
          this.cardShow = true;
        });
      }
    },
    setPlayInfo(song) {
      this.playInfo = song;
    },
    getSong(id, song) {
      this.currentMp3 = "";
      this.playShow = false;
      this.setPlayInfo(song);
      GET_SONG(id).then((res) => {
        if (res.data.data[0].url === "") {
          this.$toast.fail("暂时没有资源");
        }
        this.currentMp3 = res.data.data[0].url;
        // this.popShow = true;
        // this.playShow = true;
        this.toSongs()
      });
    },
    adClick(i) {
      i === 2 ? this.login() : false;
    },
    login() {
      this.homeAdShow = false;
    },
    toSongs() {
      this.$router.push({
        name: "lyrics",
        query: {
          id: this.playInfo.id,
          mp3: this.currentMp3,
          info: this.playInfo,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.block {
  height: auto;
  background: rgb(98, 22, 36);
}
.el-carousel__item h3 {
  color: #151618;
  background: rgb(98, 22, 36);
  font-size: 14px;
  line-height: 150px;
  margin: 0;
}
.van-card__title {
  font-size: 18px;
}
.main-color {
  color: aliceblue;
  background: rgba( #000000,  0);
}
.mask-play {
  padding: 16px 0;
  background: rgba( #000000,  0.5);
  text-align: center;
  p {
    margin-bottom: 16px;
  }
}
.serch-box {
  color: white;
  background: rgba(230, 210, 213, 0.7);
}
</style>
