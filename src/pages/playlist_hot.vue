<template>
  <div>
    <van-tabs v-model:active="active" swipeable>
      <van-tab v-for="index in 4" :title="'选项 ' + index">
        内容 {{ index }}
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="js">
import {PLAYLIST_CATLIST__} from './common_func.ts'
export default {
  setup() {
    console.log(PLAYLIST_CATLIST__())
  },
};
</script>