<template>
  <div>
    <van-tabs v-model:active="data.tabactive" swipeable @change="logact">
      <van-tab v-for="index in 4" :title="'选项 ' + index">
        内容 {{ index }}
      </van-tab>
    </van-tabs>

    <van-tabs v-model:active="data.tabactive" swipeable>
      <van-tab v-for="index in 4" :title="'选项 ' + index">
        <component :is='data.componentid'></component>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { computed, reactive } from "vue";
export default {
  setup() {
    const componentArr: Array<any> =[{name: '1'},{name: '2'},{name: '3'}]
    const data = reactive({
      tabactive: 0,
    });
    const componentid =  computed(() => {
      return componentArr[data.tabactive]
    })
    return { data,componentid };
  },
  methods: {
    logact() {
      console.log(this.data.tabactive)
    }
  }
};
</script>