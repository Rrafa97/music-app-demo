<template>
  <div>
    <div>
      <van-tabs v-model:active="state.active" swipeable>
        <van-tab title="当前热门">
          <van-col span="6">span: 6</van-col>
          <van-col span="6">span: 6</van-col>

          <van-grid
            :gutter="0"
            :column-num="2"
            :style="{ padding: '0px' }"
            icon-size="50vw"
            :border="false"
          >
            <van-grid-item
              class="van-grid-item__content_"
              v-for="item in state.hotPlayList"
              :icon="item.coverImgUrl"
              :text="item.name"
              @click="getPlaylistInfo(item.id)"
            >
            </van-grid-item>
          </van-grid>
        </van-tab>
        <van-tab v-for="item in state.playListInfo.sub" :title="item.name">
          {{ item.resourceCount }}
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { PLAYLIST_CATLIST, PLAYLIST_HOT, PLAYLIST_INFO } from "@/api/index";
import { onMounted, onBeforeMount, ref, computed, watch, reactive } from "vue";
export default {
  setup() {
    const state = reactive({
      playListInfo: {},
      active: ref(0),
      hotPlayList: {},
    });
    onBeforeMount(async () => {
      const playListCats = await PLAYLIST_CATLIST().then((res: object) => res);
      const hotPlayList = await PLAYLIST_HOT().then((res: object) => res);
      state.hotPlayList = (hotPlayList as any).data.playlists;
      state.playListInfo = (playListCats as any).data;
    });

    watch(state, () => {
      console.log(state.hotPlayList);
    });
    return { state };
  },
  methods: {
    getPlaylistInfo(id: number) {
      let this__ = this;
      PLAYLIST_INFO(id).then((res) => {
        console.log(res.data);
        (this as any).$router.push({
          name: "playlist",
          query: {
            playlistinfo: JSON.stringify(res.data.playlist),
          },
        });
      });
    },
  },
};
</script>

<style lang="less">
.van-grid-item__content_ {
  margin: 0;
  padding: 0;
  background: rgba(98, 22, 36, 0);
}
.van-grid-item__icon::after {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 200;
}
// .van-grid-item__icon::after:hover {
//   transform: scale(1.3)
// }
.van-grid-item__icon + .van-grid-item__text {
  padding: 0;
  margin: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  height: 100%;
  width: 100%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 32px;
  z-index: 200;
  transition: 0.3s;
}
.van-grid-item__icon + .van-grid-item__text:active {
  // transform: scale(1.1);
  background: rgba(0, 0, 0, 0.7);
}
</style>