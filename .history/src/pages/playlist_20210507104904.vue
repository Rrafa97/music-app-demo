<template>
  <div>
    <img
      :src="pinfo.coverImgUrl"
      id="img-back-mask"
      :style="{
        background: this.pinfo.coverImgUrl,
        position: 'fixed',
        left: 0,
        height: '100%',
        width: '100%',
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

<style>
#img-back-mask::after {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 200;
}
</style>