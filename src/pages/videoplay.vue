<template>
  <div v-if="state.refresh" :style="{ width: '100vw' }">
    <div>
      <video
        autoplay
        webkit-playsinline
        :style="{ objectFit: 'fill', width: '100vw' }"
        ref="videoPlay"
        :ontimeupdate="ontmupdate"
        @play="toPlays"
        @timeupdate="updateTime"
        @pause="toPause"
      >
        <source :src="mvdata.url" type="video/mp4" />
      </video>
      <div :style="{height:'16px'}">
        <van-row  justify="center">
        <van-col span="22">
          <van-slider
            @update:model-value="changeplayvalue"
            v-model="state.plst.percentage"
            bar-height="4px"
            active-color="#ee0a24"
          />
          <!-- <van-progress
            :percentage="state.plst.percentage"
            :pivot-text="state.plst.pstm"
            pivot-color="#7232dd"
            color="linear-gradient(to right, #be99ff, #7232dd)"
          /> -->
          <!-- <van-icon name="play-circle-o" /> -->
        </van-col>
      </van-row>
      </div>
      {{state.plst.pstm}}
      {{state.plst.percentage}}
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
        pstm: '00:00',
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
      // console.log(min + ':' + sec)
      return min + ':' + sec
    }
    let duro = transmins((reqdata.data as any).duration)
    function getAllinfo(id: number) {
      MV_DETAIL_INFO(id).then((res) => {
        reqdata.info = res.data
      })
      SIMI_MV(id).then((res) => {
        reqdata.simi = res.data
      })
      MV_DETAIL(id).then((res) => {
        reqdata.data = res.data.data
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
      setTimeout(() => {
        // console.log(videoPlay.value.ontimeupdate)
        console.log('*******************************')
        // console.log(transfromTimeToMins((videoPlay as any).value.currentTime))
        console.log('当前进度条', state.plst.percentage)
        console.log(
          '播放数据差',
          videoPlay.value.currentTime / videoPlay.value.duration,
        )
        console.log('视频长度', (videoPlay as any)._value.duration)
        // console.log('所属媒介组合', (videoPlay as any)._value.mediaGroup)
        // console.log('poster', (videoPlay as any)._value.poster)
        // ontmupdate()
      }, 2000)
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
    }
  },
  methods: {
    restUrl(id: number) {
      (this as any).state.refresh = false
      MV_URL(id).then((res) => {
        (this as any).mvdata = res.data.data
        (this as any).getAllinfo((this as any).mvdata.id)
      })
    },
  },
  toPlays() {},
  updateTime() {},
  toPause() {},
}
</script>
