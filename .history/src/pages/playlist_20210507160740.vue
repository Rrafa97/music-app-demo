<template>
  <div>
    <!-- <div v-for="">{{}}</div> -->
    <van-card
      :desc="'创建者：' + pinfo.creator.nickname"
      :title="'歌单：' + pinfo.name"
      :thumb="pinfo.coverImgUrl"
      class="main-color"
    >
      <template #bottom> 12312 </template>
      <template #desc>
        <van-tag  :style="{margin:'6px 0'}" plain color="rgb(98, 22, 36)"> {{ "创建者：" + pinfo.creator.nickname }}</van-tag>
      </template>
      <template #tag>
        <van-tag color="rgba(0,0,0,.5)"
          ><van-icon name="play-circle-o" />{{ pinfo.playCount }}</van-tag
        >
      </template>
      <template #tags>
        <p>创建时间:{{ ctimetemp }}</p>
      </template>
      <template #footer>
        <van-icon name="p-o">{{ pinfo.trackIds.length }}首</van-icon>
      </template>
    </van-card>

    <van-divider :style="{ color: 'white' }">歌单列表</van-divider>
    <van-swipe-cell>
      <template #left>
        <van-button square type="danger" text="收藏" />
      </template>
      <van-cell :border="false" title="单元格" value="内容">111</van-cell>
      <template #right>
        <van-button square type="danger" text="置顶单曲循环" />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { GET_SONG, SONGS_DETAIL } from "@/api/index";
export default {
  setup() {
    const pinfo = JSON.parse((useRoute() as unknown | any).query.playlistinfo);

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
    console.log(pinfo.trackIds.length);
    let songids: string = "0";
    for (const i in pinfo.trackIds) {
      songids = songids.concat(",", pinfo.trackIds[i].id);
    }
    // console.log(songids);
    // GET_SONG(songids).then(res => console.log(res.data.data))
    SONGS_DETAIL(songids).then((res) => console.log(res.data));
    return { pinfo, ctimetemp };
  },
};
</script>

<style>
.main-color {
  color: aliceblue;
  background: rgb(98, 22, 36);
}
</style>