<template>
  <div>
    <van-cell title="单元格" icon="play-circle-o"><p>111</p></van-cell>
  </div>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import {GET_SONG} from '@/api/index';
export default {
  setup() {
    const pinfo  = JSON.parse((useRoute() as unknown|any).query.playlistinfo);
    let songids:string = ''
    for (const i in pinfo.trackIds) {
      console.log(pinfo.trackIds[i].id)
      songids = songids + pinfo.trackIds[i].id + ','
      console.log(songids)
    }
    console.log(GET_SONG)
    console.log(pinfo.trackIds);
    return { pinfo };
  },
};
</script>
