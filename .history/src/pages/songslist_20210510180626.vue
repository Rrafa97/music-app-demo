<template>
  <div v-if="state.carShow">
    <div v-for="(index, item) in compData">
      <van-card
        :desc="'艺术家：' + index.ar[0].name"
        :title="index.name"
        :thumb="index.al.picUrl"
        :centered="false"
        @click="getSong(index.id, index)"
        class="main-color"
        style="background: rgba(#000000, 0)"
      >
        <template #tags>
          <van-tag class="main-color" plain type="danger"
            >专辑：{{ index.al.name }}</van-tag
          >
        </template>
      </van-card>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive } from "vue";
import router from "@/router/"
import { GET_SONG } from "../api/index";
import { useRoute } from "vue-router";
export default {
  props: ["compData"],
  setup() {
    const data = reactive({
      currentMp3: "",
      playShow: false,
      playInfo: {},
      carShow: false
    });
    // const router = useRoute()
    const getSong = function (id: any, item: any) {
      data.currentMp3 = "";
      data.playShow = false;
      data.playInfo = item;
      GET_SONG(id).then((res) => {
        res.data.data[0].url === ""
          ? false
          : (data.currentMp3 = res.data.data[0].url);
          toPlay()
      });
    };
    const toPlay = function () {
      (router as any).push({
        name: "lyrics",
        query: {
          id: (data.playInfo as any).id,
          mp3: data.currentMp3,
          info: data.playInfo,
        },
      });
    };
    onMounted(() => {
      data.carShow = true
    })
    return { getSong };
  },
};
</script>

<style lang="less" scoped>
@import "../assets/com.less";
</style>