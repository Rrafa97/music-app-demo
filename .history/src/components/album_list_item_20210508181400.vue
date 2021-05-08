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
import { onMounted } from 'vue'
export default {
  setup() {
    let active = 2
    
    onMounted(() => {
      setTimeout(() => {
        active = 1
      }, 1000);
    })
    return {active};
  }
}
</script>