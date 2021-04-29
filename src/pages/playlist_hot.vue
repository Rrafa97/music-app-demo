<template>
  <div>
    <van-tabs v-model:active="active" swipeable>
      <van-tab v-for="index in 4" :title="'选项 ' + index">
        内容 {{ index }}
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { PLAYLIST_CATLIST } from "../api/index.js";
export default {
  setup() {
    const playListCategories: string[] = []
    PLAYLIST_CATLIST().then((res) => {
      console.log(res.data);
    });
  },
};
</script>