<template>
  <div>
    <van-cell-group  :title="'搜索结果：' + compData.mvCount" >
    <van-cell size='large' v-for="item in compData.mvs" center :label="item.name">
      <template #title>
        <span :style="{fontSize:'18px',fontWeight:'500'}">{{item.artistName}}</span>
        <van-tag :style="{margin: '0px 1px'}" v-for="items__ in item.artists" type="warning">{{items__.name}}</van-tag>
      </template>
      <template #label>
        <van-image radius='12px' :src='item.cover'></van-image>
        <p>{{item.name}}</p>
      </template>
    </van-cell>
    </van-cell-group>
  </div>
</template>

<script lang="ts">
export default {
  props: ['compData'],
  setup(props) {
    console.log(props.compData)
  }
}
</script>