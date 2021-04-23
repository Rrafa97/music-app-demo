<template>
  <div>
    <div
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
    </div>
    <van-field v-model="state.text" label="输入搜索歌曲" />
    <van-button type="danger" @click="serch">搜索</van-button>
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
        :desc="'艺术家：' + index.artists[0].name"
        :title="'歌曲名:  ' + index.name"
        :thumb="index.artists[0].img1v1Url"
        @click="getSong(index.id)"
      >
        <template #tags>
          <van-tag plain type="danger">专辑：{{ index.album.name }}</van-tag>
        </template>
        <template #footer>
          <van-button
            :round="true"
            color="linear-gradient(to right, #ff6034, #ee0a24)"
          >
            在线播放
          </van-button>
        </template>
      </van-card>
    </div>
    <van-popup
      v-model:show="popShow"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <audio v-if="playShow" controls>
        <source :src="currentMp3" type="audio/mpeg" />
      </audio>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { SERCH_KEYWORDS, GET_SONG } from "../api/index.js";
import { reactive } from "vue";
export default {
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
    };
  },
  setup() {
    const state = reactive({
      tel: "",
      text: "lte",
      digit: "",
      number: "",
      password: "",
    });
    return { state };
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
      // console.log(e)
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
      SERCH_KEYWORDS(this.state.text).then((res) => {
        this.songs = res.data.result.songs;
        console.log(this.songs[0].album.name);
        this.cardShow = true;
      });
    },
    getSong(id) {
      this.currentMp3 = "";
      this.playShow = false;
      GET_SONG(id).then((res) => {
        console.log(res.data.data[0].url);
        this.currentMp3 = res.data.data[0].url;
        this.popShow = true;
        this.playShow = true;
      });
    },
    adClick(i) {
      i === 2 ? this.login() : false;
    },
    login() {
      console.log("登陆操作");
      this.homeAdShow = false;
    },
  },
};
</script>

<style lang="less" scoped>
.block {
  height: auto;
  background: #151618;
}
.el-carousel__item h3 {
  color: #151618;
  background: #151618;
  font-size: 14px;
  line-height: 150px;
  margin: 0;
}
</style>
