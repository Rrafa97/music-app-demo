<template>
  <div :style="{ width: '100vw' }">
    <video
      autoplay
      controls
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
      <van-icon :style="{margin:'0px 3px'}" size="18" name="good-job-o" />
      <van-icon :style="{margin:'0px 3px'}"  size="18" name="like-o" />
      <van-icon :style="{margin:'0px 3px'}"  size="18" name="star-o" />
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
  </div>
</template>
<script lang="ts">
import { MV_DETAIL } from '@/api/'
import { useRoute } from 'vue-router'
import { onMounted, reactive } from 'vue'
export default {
  setup() {
    const reqdata = reactive({
      data: {},
      duration: 0
    })
    const mvdata = JSON.parse((useRoute().query as any).data).data
    function transmins(ms:number) {
      let min = Math.floor((ms / 1000 / 60) << 0)
      let sec = Math.floor((ms / 1000) % 60)
      // console.log(min + ':' + sec)
      return min + ':' + sec
    }
    let duro = transmins((reqdata.data as any).duration)
    onMounted(() => {
      MV_DETAIL(mvdata.id).then((res) => {
        reqdata.data = res.data.data
        console.log(reqdata)
      })
    })
    return { reqdata,transmins,duro,mvdata }
  },
}
</script>
