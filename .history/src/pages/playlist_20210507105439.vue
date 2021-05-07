<template>
  <div>
    <img
      :src="pinfo.coverImgUrl"
      id="img-back-mask"
      :style="{
        background: this.pinfo.coverImgUrl,
      }"
    />
  </div>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
export default {
  setup() {
    const pinfo: any = (JSON as any).parse(useRoute().query.playlistinfo);
    console.log(pinfo.coverImgUrl);
    return { pinfo };
  },
};
</script>
