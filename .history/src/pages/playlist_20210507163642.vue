<template>
  <div>
    <!-- <div v-for="">{{}}</div> -->
    <van-card
      :desc="'创建者：' + pinfo.creator.nickname"
      :title="'歌单：' + pinfo.name"
      :thumb="pinfo.coverImgUrl"
      :style="{ paddingTop: '32px' }"
      class="main-color"
    >
      <template #bottom> 播放量：{{ pinfo.playCount }} </template>
      <template #desc>
        <van-tag
          :style="{ margin: '6px 0' }"
          round
          plain
          color="rgb(98, 22, 36)"
        >
          {{ "创建者：" + pinfo.creator.nickname }}</van-tag
        >
      </template>
      <template #tag>
        <van-tag color="rgba(0,0,0,.5)"
          ><van-icon name="play-circle-o" />{{ pinfo.playCount }}</van-tag
        >
      </template>
      <template #tags>
        <p>创建时间:{{ ctimetemp }}</p>
      </template>
      <template #num>
        <van-icon name="p-o">{{ pinfo.trackIds.length }}首</van-icon>
      </template>
    </van-card>

    <van-divider :style="{ color: 'white' }">歌单列表</van-divider>

    ----------------
    <van-swipe-cell>
      <template #left>
        <van-button square type="danger" text="收藏" />
      </template>
      <van-cell :style="{ background: 'rgba(0,0,0,0)', color: 'white' }">
        <template #title>
          <div>123</div>
          <van-tag>1231</van-tag>
        </template>
        <template #default>
          <van-icon size="24" name="play-circle-o" />
          <!-- <van-icon size="24" name="pause-circle-o" />
          <van-icon size="24" name="stop-circle-o" /> -->
        </template>
      </van-cell>
      <van-cell
        :style="{ background: 'rgba(0,0,0,0)', color: 'white' }"
        title="112"
      ></van-cell>
      <template #right>
        <van-button square type="danger" text="置顶单曲循环" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { GET_SONG, SONGS_DETAIL } from "@/api/index";
import { onBeforeMount } from "node_modules/vue/dist/vue";
export default {
  setup() {
    const pinfo = JSON.parse((useRoute() as unknown | any).query.playlistinfo);
    var songs: Array<any> = [];
    function timper(temp: string) {
      let ctemp = new Date(temp);
      let ctime: string =
        ctemp.getFullYear().toString() +
        "-" +
        ctemp.getMonth() +
        1 +
        "-" +
        ctemp.getDate();
      return ctime;
    }
    let ctimetemp = timper(pinfo.createTime);
    let songids: string = "0";
    for (const i in pinfo.trackIds) {
      songids = songids.concat(",", pinfo.trackIds[i].id);
    }
    async function getSongs() {
      const songs__ = await SONGS_DETAIL(songids).then((res: any) => res);
      songs = songs__.data
      console.log(songs__);
    }
    getSongs();
    return { pinfo, ctimetemp, songs };
  },
};
</script>

<style>
.main-color {
  color: aliceblue;
  background: rgb(98, 22, 36);
}
</style>