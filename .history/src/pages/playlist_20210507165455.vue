<template>
  <div>
    <!-- <div v-for="">{{}}</div> -->
    <van-card
      :desc="'创建者：' + pinfo__.creator.nickname"
      :title="'歌单：' + pinfo__.name"
      :thumb="pinfo__.coverImgUrl"
      :style="{ paddingTop: '32px' }"
      class="main-color"
    >
      <template #bottom> 播放量：{{ pinfo__.playCount }} </template>
      <template #desc>
        <van-tag
          :style="{ margin: '6px 0' }"
          round
          plain
          color="rgb(98, 22, 36)"
        >
          {{ "创建者：" + pinfo__.creator.nickname }}</van-tag
        >
      </template>
      <template #tag>
        <van-tag color="rgba(0,0,0,.5)"
          ><van-icon name="play-circle-o" />{{ pinfo__.playCount }}</van-tag
        >
      </template>
      <template #tags>
        <p>创建时间:{{ state.ctimetemp }}</p>
      </template>
      <template #num>
        <van-icon name="p-o">{{ pinfo__.trackIds.length }}首</van-icon>
      </template>
    </van-card>

    <van-divider :style="{ color: 'white' }">歌单列表</van-divider>

    ----------------
    <!-- <div v-for="item in state.songs">
      {{item.name}}
    </div> -->

    <van-swipe-cell v-for="item in state.songs">
      <template #left>
        收藏
        <!-- <van-button square type="danger" text="收藏" /> -->
      </template>
      <van-cell :style="{ background: 'rgba(0,0,0,0)', color: 'white' }">
        <template #title>
          <div :style="{fontSize:'22px', whiteSpace: 'nowrap'}">{{item.name}}</div>
          <div :style="{color: 'rgb(236, 118, 150)', whiteSpace: 'nowrap'}">专辑：{{item.al.name}}</div>
        </template>
        <template #default>
          <van-icon size="24" name="play-circle-o" />
          <!-- <van-icon size="24" name="pause-circle-o" />
          <van-icon size="24" name="stop-circle-o" /> -->
        </template>
      </van-cell>

      <template #right>
        <!-- <van-button square type="danger" text="置顶单曲循环" /> -->
      </template>
    </van-swipe-cell>
  </div>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { GET_SONG, SONGS_DETAIL } from "@/api/index";
import { reactive } from "vue";
export default {
  setup() {
    const pinfo__ = JSON.parse((useRoute() as unknown | any).query.playlistinfo);
    const state = reactive({
      songs: [],
      pinfo: pinfo__,
      ctimetemp: timper(pinfo__.createTime)
    })
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
    // let ctimetemp = timper(pinfo.createTime);
    let songids: string = "0";
    for (const i in state.pinfo.trackIds) {
      songids = songids.concat(",", state.pinfo.trackIds[i].id);
    }
    async function getSongs() {
      const songs__ = await SONGS_DETAIL(songids).then((res: any) => res);
      state.songs = songs__.data.songs
      console.log(state.songs);
    }
    getSongs();
    return { pinfo__, state };
  },
};
</script>

<style>
.main-color {
  color: aliceblue;
  background: rgb(98, 22, 36);
}
</style>