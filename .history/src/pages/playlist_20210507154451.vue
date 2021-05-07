<template>
  <div>
    <!-- <div v-for="">{{}}</div> -->
    <van-card
      :desc="'创建者：' + pinfo.creator.name"
      :title="'歌单：' + pinfo.name"
      :thumb="pinfo.coverImgUrl"
    >
      <template #tags>
        <p>创建时间:{{ ctimetemp }}</p>
      </template>
    </van-card>
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
      return ctime
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
    return { pinfo,ctimetemp };
  },
};
</script>
