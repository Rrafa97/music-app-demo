<template>
  <div v-if="state.refresh" :style="{ width: '100vw' }">
    <div :style="{padding:'0px 0',background: '#000'}">
      <video
        webkit-playsinline
        :style="{ objectFit: 'fill', width: '100vw' }"
        ref="videoPlay"
        :poster="reqdata.data.cover"
        :ontimeupdate="ontmupdate"
        @timeupdate="updateTime"
        @pause="toPause"
        @click="vplay"
      >
        <source :src="mvdata.url" type="video/mp4" />
      </video>
      <div :style="{position:'absolute',width:'100vw'}">
        <!-- <van-icon class='icon-play' name="play-circle-o" /> -->
        <div  
        :style="{
          height:'25px', 
          padding:'15px 0vw', 
          position: 'relative',
          top:'-55px',
          backgroundImage: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.7))',
          display:'flex',
           justifyContent: 'center'
          }">
        <van-row class="constl" justify="center">
          <!-- <van-icon size='12px' name="play-circle-o" color='white' :style="{margin:'0px 8px'}"/> -->
          <p :style="{color:'white',fontSize:'13px'}">{{state.plst.pstm}}</p>
          <van-col span="18">
            <van-slider :style="{margin:'0px 12px'}" @update:model-value="changeplayvalue" v-model="state.plst.percentage" bar-height="5px" button-size='8px' active-color="rgba(255, 255, 255,.7)" inactive-color='rgba(43, 18, 22,.7)' />
        </van-col>
        <van-icon name="setting-o" />
      </van-row>
      </div>
      </div>
      
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
    })
    const reqdata = reactive({
      data: {},
      info: {},
      simi: {},
      duration: 0,
    })
    var videoPlay: any = ref(null)
    const mvdata:any = reactive(JSON.parse((useRoute().query as any).data).data)
    function transmins(ms: number) {
      let min = Math.floor((ms / 1000 / 60) << 0)
      let sec = Math.floor((ms / 1000) % 60)
      return min + ':' + sec
    }
    let duro = transmins((reqdata.data as any).duration)
    let vplay = function() {
      console.log('当前视频状态',videoPlay.value.paused)
      videoPlay.value.paused ? videoPlay.value.play() : videoPlay.value.pause()
      
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

      state.plst.percentage = Math.floor((vvl.currentTime / vvl.duration ) * 100)
      state.plst.pstm = transfromTimeToMins(videoPlay.value.currentTime)
    }
    function changeplayvalue() {
     videoPlay.value.currentTime = (state.plst.percentage * videoPlay.value.duration)/100
    }
    onMounted(() => {
      getAllinfo(mvdata.id)
    })
    return {
      ontmupdate,
      reqdata,
      videoPlay,
      transmins,
      state,
      duro,
      mvdata,
      getAllinfo,
      changeplayvalue,
      vplay
    }
  },
  methods: {
    restUrl(id: number) {
      (this as any).state.refresh = false;
      (this as any).state.plst.percentage = 0;
      (this as any).state.plst.pstm = '0:00';
      console.log('重置')
      MV_URL(id).then((res) => {
        (this as any).mvdata = res.data.data;
        (this as any).getAllinfo((this as any).mvdata.id);
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
  justify-content:stretch ;
  justify-items: stretch;
  flex-wrap: nowrap;
  width: 80vw;
  van-slider {
    max-width: 70vw;
    width: 70vw;
    margin: 0 5px;
  }
}
.icon-play {
  position: absolute;
}
</style>