<template>
  <div>
    <van-cell title="单元格" icon="arrow"><p>111</p></van-cell>
  </div>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
export default {
  setup() {
    const pinfo = JSON.parse((useRoute() as unknown|any).query.playlistinfo);
    console.log(pinfo.coverImgUrl);
    return { pinfo };
  },
};
</script>
