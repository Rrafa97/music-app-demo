<template>
  <div>
    <van-cell-group  :title="'搜索结果：' + compData.playlistCount" ></van-cell-group>
    <van-grid :column-num="3" icon-size="96" :center='false'>
      <van-grid-item
        v-for="item in compData.playlists"
        :icon="item.coverImgUrl"
        :text="item.name + '—播放：' + item.playCount"
        @click="toSongsList(item.id)"
      >
      <template #icon>
        <van-image radius='12px' :src="item.coverImgUrl"/>
      </template>
      <template #text>
        <div :style="{fontSize: '14px',color: 'rgba(0, 0, 0,.7)'}">{{item.name}}</div>
        <p :style="{fontSize: '12px',color: 'rgba(18, 110, 130,.6)'}">播放：{{item.playCount}}</p>
      </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script lang="ts">
import { PLAYLIST_INFO} from "@/api/index";
export default {
  props: ['compData'],
  setup(props: any) {
    let state = {
      fireicon: '',
    }
    console.log(props.compData)

    return { state }
  },
  methods: {
    toSongsList(id:any) {
      PLAYLIST_INFO(id).then( res => {
        console.log(res);
        (this as any).$router.push({ name: "playlist",query: { playlistinfo: JSON.stringify(res.data.playlist), }, });
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
