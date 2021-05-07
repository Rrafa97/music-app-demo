<template>
  <div>
    <div>
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
          <!-- <van-row justify="left" v-for="item in state.hotPlayList">
            <van-col span="10">
              <van-image
                :style="{ border: '10px groove rgb(206, 87, 119)' }"
                width="128"
                round
                height="128"
                :src="item.coverImgUrl"
              />
            </van-col>
            <van-col span="14">

              <van-cell
                title-style="font-size: 24px;white-space:nowrap"
                arrow-direction
                :value="item.creator.nickname + ''"
                :label='"最后更新时间"'
                :style="{ background: 'rgb(98, 22, 36)', color: 'white' }"
                :title="item.name"
              />
            </van-col>
          </van-row> -->

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
              @click="getPlaylistInfo(item.id)"
              dot
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
