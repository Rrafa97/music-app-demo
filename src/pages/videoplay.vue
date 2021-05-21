<template>
  <div v-if="state.refresh" :style="{ width: '100vw' }">
    <van-sticky>
    <div ref="playbox" :style="{ padding: '0px 0', background: '#000' }" class="video-box">
      <div :style="state.playarea">
        <van-icon v-if="!state.playstau" size='64' color="white" name="play-circle-o" />
      </div>
      <video
        webkit-playsinline
        @touchmove="contrlstouchmove"
        :style="{ objectFit: 'fill',width: state.fullscreamdata.width, height: state.fullscreamdata.height }"
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
            display: state.contrlBox.display,
            justifyContent: 'center',
          }"
        >
          <van-row class="constl" :style="state.constl" justify="center">
            <van-icon size='18' color="white" v-if="state.playstau" :style="{margin:'0 8px'}" name="pause-circle-o" />
            <van-icon  size='18' color="white" v-else :style="{margin:'0 8px'}" name="play-circle-o" />
            <p :style="{ color: 'white', fontSize: '13px' }">
              {{ state.plst.pstm }}
            </p>
              <van-slider
                :style="state.constlVanSlider"
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
    </van-sticky>
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
    // 播放器配置
    const state = reactive({
      refresh: false,
      plst: {
        currtime: 0,
        percentage: 0,
        pstm: '0:00',
      },
      playstau: false,
      fullscreamdata: {
        width: '100vw',
        height: '30vh'
      },
      constl: {
        width: "100vw",
        maxWidth: '100vw'
      },
      constlVanSlider: {
        maxWidth: '70vw',
        width: '70vw',
        margin: '0 10px'
      },
      contrlBox: {
        display: 'flex'
      },
      playarea: {
        position: 'absolute',
        width: '100%',
        marginTop: '10vh',
        opacity: '.6'
      }
    })
    // mv数据
    const reqdata = reactive({
      data: {},
      info: {},
      simi: {},
      duration: 0,
    })

    var videoPlay: any = ref(null)
    var playbox : any = ref(null)

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

    function contrlstouchmove() {
      console.log('触摸控制')
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

    document.addEventListener('fullscreenchange', (event) => {
       if (document.fullscreenElement) {
          console.log(`Element: ${document.fullscreenElement.id} entered full-screen mode.`);
           } else {
             console.log('Leaving full-screen mode.');
              }
              });


    function setFullscrem () {
      let stypotion = {
        height: '100vh',
        position: 'absolute',
        width: '100vw',
        left: '0',
        top:'0',
        transition: '.3s'
      }
      state.constl = { width: '100vh',maxWidth:'100vh'};
      state.constlVanSlider = { maxWidth:'70vh',width:'70vh',margin:'0 12px'};
      playbox.value.style = stypotion
      state.fullscreamdata.width = '100vh'
      state.fullscreamdata.height = '100vw'
      console.log(state.fullscreamdata.width);
      state.contrlBox.display = ''
      let playarea__ ={ position: 'absolute', top:"40vw", left: '40vh' };
      (state as any).playarea = playarea__
      playbox.value.style.transform= 'rotateZ(90deg)'
    }

    return {showPopover,actions,
      ontmupdate,
      reqdata,
      videoPlay,
      playbox,
      transmins,
      state,
      duro,
      mvdata,
      getAllinfo,
      changeplayvalue,
      vplay,
      setFullscrem,
      contrlstouchmove
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
  // width: 100vw;
  // max-width: 100vw;
  van-slider {
    // max-width: 70vw;
    // width: 70vw;
    // margin: 0 5px;
  }
}
.icon-play {
  position: absolute;
}
.video-box {
  position: relative;
  text-align: center;
  z-index: 9999;
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
