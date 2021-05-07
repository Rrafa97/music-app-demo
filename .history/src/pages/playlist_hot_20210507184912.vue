<template>
  <div>
    <div @touchstart="touchstart" @touchend="touchend" @touchmove="touchmove">
      <van-tabs
        animated
        color="white"
        sticky
        background="rgb(98, 22, 36)"
        v-model:active="state.active"
        swipeable
        title-inactive-color="rgb(200, 173, 196)"
        title-active-color="rgb(226, 225, 228)"
      >
        <van-tab title="当前热门歌单">
          <van-grid
            :gutter="0"
            :column-num="3"
            icon-size="102px"
            :border="false"
          >
            <van-grid-item
              v-for="item in state.hotPlayList"
              :icon="item.coverImgUrl"
              :text="item.name"
              color="white"
              @click="getPlaylistInfo(item.id)"
              dot
            >
              <van-tag
                round
                color="rgba(0, 0, 0,.6)"
                :style="{
                  position: 'absolute',
                  right: '.8rem',
                  top: '.3rem',
                  zIndex: '303',
                  textAlign: 'right',
                }"
                type="primary"
                ><van-icon name="play-circle-o" />{{ item.playCount }}</van-tag
              >
              <van-image
                width="6.4rem"
                height="6.4rem"
                radius="6"
                :src="item.coverImgUrl"
              ></van-image>
              <div :style="{ margin: '16px', whiteSpace: 'nowrap' }">
                {{ item.name }}
              </div>
            </van-grid-item>
          </van-grid>
        </van-tab>

        <van-tab title="全部歌单">
          <van-grid
            :gutter="0"
            :column-num="2"
            icon-size="102px"
            :border="false"
          >
            <van-grid-item
              v-for="item in state.allList"
              :icon="item.coverImgUrl"
              :text="item.name"
              color="white"
              @click="getPlaylistInfo(item.id)"
              dot
            >
              <van-tag
                round
                color="rgba(0, 0, 0,.6)"
                :style="{
                  position: 'absolute',
                  right: '.8rem',
                  top: '.3rem',
                  zIndex: '303',
                  textAlign: 'right',
                }"
                type="primary"
                ><van-icon name="play-circle-o" />{{ item.playCount }}</van-tag
              >
              <van-image
                width="6.4rem"
                height="6.4rem"
                radius="6"
                :src="item.coverImgUrl"
              ></van-image>
              <div :style="{ whiteSpace: 'nowrap' }">
                {{ item.name }}
              </div>
            </van-grid-item>
          </van-grid>
        </van-tab>
        <!-- <van-tab v-for="item in state.playListInfo.sub" :title="item.name">
          {{ item.resourceCount }}
        </van-tab> -->
      </van-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import {
  PLAYLIST_CATLIST,
  PLAYLIST_HOT,
  PLAYLIST_INFO,
  HIGHT_QUALITY_PL,
} from "@/api/index";
import { onMounted, onBeforeMount, ref, computed, watch, reactive } from "vue";
export default {
  setup() {
    const state = reactive({
      playListInfo: {},
      active: ref(3),
      hotPlayList: {},
      allList: {},
    });
    onBeforeMount(async () => {
      const playListCats = await PLAYLIST_CATLIST().then((res: object) => res);
      const hotPlayList = await PLAYLIST_HOT().then((res: object) => res);
      const allList = await HIGHT_QUALITY_PL(100).then((res: object) => res);
      state.hotPlayList = (hotPlayList as any).data.playlists;
      state.playListInfo = (playListCats as any).data;
      state.allList = (allList as any).data.playlists;
      console.log(state.allList);
    });

    watch(state, () => {
      // console.log(state.hotPlayList);
    });
    return { state };
  },
  methods: {
    getPlaylistInfo(id: number) {
      let this__ = this;
      PLAYLIST_INFO(id).then((res) => {
        // (this as any).$router.push({
        //   name: "playlist",
        //   query: {
        //     playlistinfo: JSON.stringify(res.data.playlist),
        //   },
        // });
      });
    },
    touchmove(e: any) {},
    touchstart(e: any) {
      // console.log(e);
    },
    touchend(e: any) {
      // console.log(e);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .van-grid-item__content {
  padding: 0;
}
</style>