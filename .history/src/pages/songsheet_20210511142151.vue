<template>
  <div>
    <van-tabs v-model:active="data.tabactive" swipeable>
      <van-tab v-for="index in 4" :title="'选项 ' + index">
        内容 {{ index }}
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
export default {
  setup() {
    const data = reactive({
      tabactive: 0,
    });
    return { data };
  },
};
</script>