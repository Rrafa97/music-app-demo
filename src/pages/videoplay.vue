<template>
  <div v-if="state.refresh" :style="{ width: '100vw' }">
    <div :style="{ padding: '0px 0', background: '#000' }" class="video-box">
      <video
        webkit-playsinline
        :style="{ objectFit: 'fill',width:'100vw', height: '30vh' }"
        ref="videoPlay"
        :poster="reqdata.data.cover"
        :ontimeupdate="ontmupdate"
        @timeupdate="updateTime"
        @pause="toPause"
        @click="vplay"
      >
        <source :src="mvdata.url" type="video/mp4" />
      </video>
      <div :style="{ position: 'absolute', width: '100vw' }">
        <!-- <van-icon class='icon-play' name="play-circle-o" /> -->
        <div
          :style="{
            height: '25px',
            padding: '15px 0vw',
            position: 'relative',
            top: '-55px',
            backgroundImage: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.5))',
            display: 'flex',
            justifyContent: 'center',
          }"
        >
          <van-row class="constl" justify="center">
            <!-- <van-icon size='12px' name="play-circle-o" color='white' :style="{margin:'0px 8px'}"/> -->
            <!-- <svg :style="{margin:'0 8px'}" t="1621565479234" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2421" width="16" height="16"><path d="M102.425742 102.393565v819.148516l614.361387-409.574258z" fill="#e6e6e6" p-id="2422"></path><path d="M153.622524 102.393565v819.148516l614.361387-409.574258z" fill="#e6e6e6" p-id="2423"></path><path d="M259.599863 15.871003V834.507551l619.481066-405.478515z" fill="#e6e6e6" p-id="2424"></path><path d="M261.135767 189.428094l-1.535904 818.636549L875.497154 599.002353z" fill="#e6e6e6" p-id="2425"></path><path d="M204.819306 102.393565m-102.393564 0a102.393565 102.393565 0 1 0 204.787129 0 102.393565 102.393565 0 1 0-204.787129 0Z" fill="#e6e6e6" p-id="2426"></path><path d="M819.180694 409.574258c-56.316461 0-102.393565 46.077104-102.393565 102.393565s46.077104 100.345693 102.393565 102.393564c57.852364 2.047871 102.905532-45.053168 102.393564-102.393564-0.511968-56.316461-46.077104-102.393565-102.393564-102.393565zM204.819306 819.148517c-56.316461 0-102.393565 46.077104-102.393564 102.393564s46.077104 100.345693 102.393564 102.393565c53.756621 2.047871 100.857661-45.053168 102.393565-102.393565 1.535903-56.316461-46.077104-102.393565-102.393565-102.393564z" fill="#e6e6e6" p-id="2427"></path></svg> -->
            <!-- <svg v-if="state.playstau" :style="{margin:'0 8px'}" t="1621565634400" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1967" width="128" height="128"><path d="M191.397656 128.194684l191.080943 0 0 768.472256-191.080943 0 0-768.472256Z" p-id="1968" fill="#ffffff"></path><path d="M575.874261 128.194684l192.901405 0 0 768.472256-192.901405 0 0-768.472256Z" p-id="1969" fill="#ffffff"></path></svg>
            <svg v-else :style="{margin:'0 8px'}" t="1621565574090" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2683" width="128" height="128"><path d="M989.155556 559.217778L373.048889 973.198222a56.888889 56.888889 0 0 1-88.604445-47.217778V98.019556a56.888889 56.888889 0 0 1 88.604445-47.217778L989.155556 464.782222a56.888889 56.888889 0 0 1 0 94.435556z" fill="#ffffff" p-id="2684"></path></svg> -->
            <van-icon size='18' color="white" v-if="state.playstau" :style="{margin:'0 8px'}" name="pause-circle-o" />
            <van-icon  size='18' color="white" v-else :style="{margin:'0 8px'}" name="play-circle-o" />
            <p :style="{ color: 'white', fontSize: '13px' }">
              {{ state.plst.pstm }}
            </p>
              <van-slider
                :style="{ margin: '0 10px'}"
                @update:model-value="changeplayvalue"
                v-model="state.plst.percentage"
                bar-height="3px"
                button-size="6px"
                active-color="rgba(255, 255, 255,.7)"
                inactive-color="rgba(43, 18, 22,.7)"
              />
            <van-icon size="18" color="white" name="expand-o" @click='setFullscrem' />
            <van-popover
              v-model:show="showPopover"
              theme="dark"
              placement="top-end"
              duration='.1'
              :style="{  textAlign: 'center',    verticalAlign: 'middle'}"
              :actions="actions"
            >
            <div :style="{color: 'rgb(230, 210, 213)',background:'rgba(0,0,0,.5)',padding:'8px'}">
            <div :style="{fontSize:'10px',margin:'2px'}">分辨率</div>
            <div :style="{fontSize:'10px',margin:'2px'}">播放速度</div>
            <div :style="{fontSize:'10px',margin:'2px'}">画面比例</div>
            </div>
              <template #reference>
                <div :style="{height:'18px',margin:'0 10px'}">
                  <van-icon name="setting-o" size="18" color="white"></van-icon>
                </div>
              </template>
            </van-popover>
          </van-row>
        </div>
      </div>
      <!-- <div
        class="video-play-sty"
        :style="{
          background: 'url(@/assets/logo.png) no-repeat',
          backgroundSize: '100% 100%',
        }"
        @click="vplay"
      ></div> -->
    </div>
    <van-card
      :desc="reqdata.data.artistName"
      :title="reqdata.data.name"
      :thumb="reqdata.data.cover"
    >
      <template #footer>
        <van-icon
          :style="{
            margin: '0px 3px',
            textAlign: 'center',
            lineHeight: '16px',
            height: '16px',
            color: 'rgb(238, 72, 102)',
          }"
          size="16"
          name="good-job-o"
        >
          <span
            :style="{
              verticalAlign: 'bottom',
              fontSize: '10px',
              display: 'inline-block',
              color: 'rgb(181, 152, 161)',
            }"
            >{{ reqdata.info.likedCount }}</span
          >
        </van-icon>
        <van-icon
          :style="{
            margin: '0px 3px',
            textAlign: 'center',
            lineHeight: '20px',
            height: '20px',
            color: 'rgb(238, 72, 102)',
          }"
          size="16"
          name="share-o"
        >
          <span
            :style="{
              verticalAlign: 'bottom',
              fontSize: '10px',
              display: 'inline-block',
              color: 'rgb(181, 152, 161)',
            }"
            >{{ reqdata.info.shareCount }}</span
          >
        </van-icon>
        <!-- <van-icon :style="{margin:'0px 3px'}"  size="20" name="like-o" /> -->
        <van-icon
          :style="{
            margin: '0px 3px',
            textAlign: 'center',
            lineHeight: '20px',
            height: '20px',
            color: 'rgb(238, 72, 102)',
          }"
          size="16"
          name="more-o"
        >
          <span
            :style="{
              verticalAlign: 'bottom',
              fontSize: '10px',
              display: 'inline-block',
              color: 'rgb(181, 152, 161)',
            }"
            >{{ reqdata.info.commentCount }}</span
          >
        </van-icon>
      </template>
      <template #title>
        <p :style="{ margin: '2px 0', fontSize: '18px' }">
          {{ reqdata.data.name }}
        </p>
      </template>
      <template #desc>
        <p :style="{ margin: '3px 0' }">歌手：{{ reqdata.data.artistName }}</p>
        <p>发行时间：{{ reqdata.data.publishTime }}</p>
        <van-tag
          :style="{ margin: '2px' }"
          v-for="item in reqdata.data.videoGroup"
          type="warning"
          >{{ item.name }}</van-tag
        >
      </template>
    </van-card>
    <van-cell-group :border="false" title="以下是相似mv：">
      <van-cell
        :border="false"
        size="large"
        v-for="item in reqdata.simi.mvs"
        center
        :label="item.briefDesc"
      >
        <template #title>
          <span :style="{ fontSize: '18px', fontWeight: '500' }">{{
            item.name
          }}</span>
          <van-tag
            :style="{ margin: '0px 1px' }"
            v-for="items__ in item.artists"
            type="warning"
            >{{ items__.name }}</van-tag
          >
        </template>
        <template #label>
          <van-image
            @click="restUrl(item.id)"
            radius="12px"
            :src="item.cover"
          ></van-image>
          <p>{{ item.briefDesc }}</p>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script lang="ts">
import { MV_DETAIL, MV_DETAIL_INFO, SIMI_MV, MV_URL } from '@/api/'
import { transfromTimeToMins } from '@/utils/'
import { useRoute } from 'vue-router'
import { onMounted, reactive, watch, ref, Ref } from 'vue'
declare type Nullable<T> = T | null
export default {
  setup() {
    const state = reactive({
      refresh: false,
      plst: {
        currtime: 0,
        percentage: 0,
        pstm: '0:00',
      },
      playstau: false
    })
    const reqdata = reactive({
      data: {},
      info: {},
      simi: {},
      duration: 0,
    })
    var videoPlay: any = ref(null)
    const mvdata: any = reactive(
      JSON.parse((useRoute().query as any).data).data,
    )
    function transmins(ms: number) {
      let min = Math.floor((ms / 1000 / 60) << 0)
      let sec = Math.floor((ms / 1000) % 60)
      return min + ':' + sec
    }
    let duro = transmins((reqdata.data as any).duration)
    let vplay = function() {
      
      if( videoPlay.value.paused ) {
        state.playstau = true
        videoPlay.value.play()
      } else {
        state.playstau = false
        videoPlay.value.pause()
      }
      // videoPlay.value.paused ? videoPlay.value.play() : videoPlay.value.pause()
    }
    function getAllinfo(id: number) {
      MV_DETAIL_INFO(id).then((res) => {
        reqdata.info = res.data
      })
      SIMI_MV(id).then((res) => {
        reqdata.simi = res.data
      })
      MV_DETAIL(id).then((res) => {
        reqdata.data = res.data.data
        console.log(reqdata)
        state.refresh = true
      })
    }
    function ontmupdate() {
      let vvl = videoPlay.value

      state.plst.percentage = Math.floor((vvl.currentTime / vvl.duration) * 100)
      state.plst.pstm = transfromTimeToMins(videoPlay.value.currentTime)
    }
    function changeplayvalue() {
      videoPlay.value.currentTime =
        (state.plst.percentage * videoPlay.value.duration) / 100
    }
    onMounted(() => {
      getAllinfo(mvdata.id)
    })
    const showPopover = ref(false);
    const actions = [
      { text: '选项一' },
      { text: '选项二' },
      { text: '选项三' },
    ];
    function setFullscrem () {
      console.log(videoPlay.value.style.x5VideoOrientation)
      // videoPlay.value.style.x5VideoOrientation= 'landscape'
      // videoPlay.value.style.height = '100vw'
    }
    return {showPopover,actions,
      ontmupdate,
      reqdata,
      videoPlay,
      transmins,
      state,
      duro,
      mvdata,
      getAllinfo,
      changeplayvalue,
      vplay,
      setFullscrem
    }
  },
  methods: {
    restUrl(id: number) {
      ;(this as any).state.refresh = false;
      (this as any).state.playstau = false
      ;(this as any).state.plst.percentage = 0
      ;(this as any).state.plst.pstm = '0:00'
      console.log('重置')
      MV_URL(id).then((res) => {
        ;(this as any).mvdata = res.data.data
        ;(this as any).getAllinfo((this as any).mvdata.id)
      })
    },
  },
  toPlays() {
    console.log('事件触发')
  },
  updateTime() {},
  toPause() {},
}
</script>

<style lang="less" scoped>
.constl {
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-bottom: -16px;
  width: 100vw;
  max-width: 100vw;
  van-slider {
    max-width: 70vw;
    width: 70vw;
    margin: 0 5px;
  }
}
.icon-play {
  position: absolute;
}
.video-box {
  position: relative;
  text-align: center;
  .video-play-sty {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 999;
    cursor: pointer;
  }
}
</style>
