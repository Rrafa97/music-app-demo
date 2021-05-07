<template>
  <div>
    <van-cell title="单元格" icon="play-circle-o"><p>111</p></van-cell>
  </div>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import {GET_SONG,SONGS_DETAIL} from '@/api/index';
export default {
  setup() {
    const pinfo  = JSON.parse((useRoute() as unknown|any).query.playlistinfo);
    let songids:string = '0'
    for (const i in pinfo.trackIds) {
      songids = songids.concat(",",pinfo.trackIds[i].id)
    }
    console.log(songids)
    console.log(GET_SONG(songids).then(res => console.log(res)))
    SONGS_DETAIL(songids).then(res => console.log(res))
    return { pinfo };
  },
};
</script>
