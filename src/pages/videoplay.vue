<template>
  <div :style="{ width: '100vw' }">
    <video
      autoplay
      webkit-playsinline
      :style="{ objectFit: 'fill', width: '100vw' }"
    >
      <source :src="mvdata.url" type="video/mp4" />
    </video>
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
        :label="item.name"
      >
        <template #title>
          <span :style="{ fontSize: '18px', fontWeight: '500' }">{{
            item.artistName
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
          <p>{{ item.name }}</p>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script lang="ts">
import { MV_DETAIL, MV_DETAIL_INFO, SIMI_MV, MV_URL } from '@/api/'
import { useRoute } from 'vue-router'
import { onMounted, reactive, watch } from 'vue'
export default {
  setup() {
    const reqdata = reactive({
      data: {},
      info: {},
      simi: {},
      duration: 0,
    })
    const mvdata = reactive(JSON.parse((useRoute().query as any).data).data)
    function transmins(ms: number) {
      let min = Math.floor((ms / 1000 / 60) << 0)
      let sec = Math.floor((ms / 1000) % 60)
      // console.log(min + ':' + sec)
      return min + ':' + sec
    }
    let duro = transmins((reqdata.data as any).duration)
    onMounted(() => {
      MV_DETAIL_INFO(mvdata.id).then((res) => {
        reqdata.info = res.data
      })
      SIMI_MV(mvdata.id).then((res) => {
        reqdata.simi = res.data
        console.log(reqdata)
      })
      MV_DETAIL(mvdata.id).then((res) => {
        reqdata.data = res.data.data
      })
    });
    return { reqdata, transmins, duro, mvdata }
  },
  methods: {
    restUrl(id: number) {
      MV_URL(id).then((res) => {
        console.log(res.data);
        this.mvdata = res.data.data;
        this.$router.push({
           path: '/videoplay',
          query: {
            data: JSON.stringify(res.data),
            id: new Date().getTime()
          },
        })
      })
    },
  },
}
</script>
