<template>
  <div>
    <van-cell-group  :title="'搜索结果：' + compData.mvCount" >
    <van-cell size='large' v-for="item in compData.mvs" center :label="item.name">
      <template #title>
        <span :style="{fontSize:'18px',fontWeight:'500'}">{{item.artistName}}</span>
        <van-tag :style="{margin: '0px 1px'}" v-for="items__ in item.artists" type="warning">{{items__.name}}</van-tag>
      </template>
      <template #label>
        <van-image  @click="getUrl(item.id)" radius='12px' :src='item.cover'></van-image>
        <p>{{item.name}}</p>
      </template>
    </van-cell>
    </van-cell-group>
  </div>
</template>

<script lang="ts">
import { MV_URL } from "@/api/index";
export default {
  props: ['compData'],
  setup(props:object) {
    console.log((props as any).compData)
  },
  methods: {
    getUrl(id:number) {
      MV_URL(id).then(res => {
        console.log(res.data);
        (this as any).$router.replace({
          path: '/videoplay',
          query: {
            data: JSON.stringify( res.data),
            id: new Date().getTime()
          }
        });
      })
    }
  }
}
</script>