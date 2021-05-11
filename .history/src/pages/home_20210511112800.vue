<template>
  <div class="main-color">
    <van-search
      v-model="state.text"
      shape="round"
      show-action
      background="rgb(98, 22, 36)"
      placeholder="请输入搜索关键词"
    >
      <template #action>
        <van-button size="small" round type="danger" @click="serch"
          >搜索</van-button
        >
      </template></van-search
    >
    <div v-if="cardShow">
      <van-tabs
        v-model:active="state.serchactive"
        swipeable
        @change="changeCat"
        :before-change="beforeChange"
      >
        <van-tab v-for="item in state.serchcat" :title="item.name">
          <emptyle v-if="item.data === null" />
          <component v-else :is="componentIs" :compData="state.compData"></component>
        </van-tab>
      </van-tabs>
    </div>
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
import { SERCH_KEY, SERCH_HOT, GET_SONG,SERCH_KEYWORDS } from "../api/index";
import { reactive, ref, provide,markRaw } from "vue";
import playlisthot from '@/pages/playlist_hot.vue';
import emptyle from '@/components/emptyle.vue';
import album_list_item from '@/components/album_list_item.vue';
import songslist from '@/pages/songslist.vue';
// import playsmall from "@/pages/playsmall";
export default {
  name: 'home',
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
    'playlist-hot':playlisthot,
    'emptyle':emptyle,
    'album-list-item':album_list_item
},
  setup() {
    // const album_list_item = { import album_list_item from '@/components/album_list_item.vue'; }
    const AlbumListItem = () => Promise.resolve(import(/* webpackChunkName: "user" */ "@/components/album_list_item.vue"));
    const state = reactive({
      tel: "",
      text: "",
      digit: "",
      number: "",
      password: "",
      serchactive: 0,
      compData: {},
      songs:[],
      serchcat: [
        {name: '单曲',val:1,data:null,component: markRaw(songslist)},
        { name:'专辑',val: 10,data:null,component:markRaw(album_list_item) },
      { name:'歌手',val: 100,data: null,component:markRaw(album_list_item) 
      },{ name:'歌单',val: 1000,data:null,component: markRaw(songslist) },
      { name:'用户',val: 1002,data:null,component: markRaw(songslist) },
      { name:'MV',val: 1004 ,data:null,component: markRaw(songslist)},
      { name:'歌词',val: 1006,data:null,component: markRaw(songslist) },
      { name:'电台',val: 1009,data:null,component: markRaw(songslist) },
      { name:'视频',val: 1014 ,data:null,component: markRaw(songslist)},
      { name:'综合',val: 1018 ,data:null,component: markRaw(songslist)}]
    });

     const beforeChange = (item) => {
      // if (index === 1) {
      //   return false;
      // }
      console.log(item);
      return new Promise((resolve) => {
        resolve(item !== 3);
      });
    };

    var playInfo = false;
    const audio = ref(null);
    SERCH_HOT().then((res) => {
      state.text = res.data.result.hots[0].first;
    });
    return { audio, state, playInfo };
  },
  computed: {
    componentIs() {
      let index = this.state.serchactive
      
      let dat = this.state.serchcat[index]
      this.state.compData = this.state.serchcat[index].data
      if (this.cardShow) {
        if (this.state.serchcat[index].data !== null) {
          this.state.compData = this.state.serchcat[index].data
          return dat.component
        } else {
          return emptyle
        }
        
      }
        
    }
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
        this.state.serchactive = 0
        SERCH_KEY(this.state.text).then((res) => {
          this.state.songs = res.data.result.songs;
          this.state.compData = this.state.songs
          this.state.serchcat[0].data = this.state.compData
          this.cardShow = true;
        });
      }
    },
    setPlayInfo(song) {
      this.playInfo = song;
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
    changeCat() {
      if (this.state.serchcat[this.state.serchactive ].data === null) {
              SERCH_KEYWORDS(this.state.text,50,this.state.serchcat[this.state.serchactive ].val).then( res => {
        
        this.state.serchcat[this.state.serchactive].data = res.data.result
        let data__ = this.state.serchcat[this.state.serchactive].data
        this.state.compData = data__
        })
      }

    }
  },
};
</script>

<style lang="less">
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
  background: rgba(#000000, 0);
}
.mask-play {
  padding: 16px 0;
  background: rgba(#000000, 0.5);
  text-align: center;
  p {
    margin-bottom: 16px;
  }
}
.serch-box {
  color: white;
  border-radius: 21px;
  background: rgba(230, 210, 213, 0.7);

  position: relative;
  right: 0;
  top: 0;
}
</style>
