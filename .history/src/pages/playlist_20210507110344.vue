<template>
  <div>
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
