<template>
  <div>
    <van-cell-group  :title="'搜索结果：' + compData.artistCount" ></van-cell-group>
    <van-row v-for="item in compData.artists">
      <van-col span="18">
        <van-cell-group>
          <van-cell :title="item.name" :value="item.alias[0]" :border="false" :icon="state.fireicon" :label="'专辑数：' + item.albumSize"/>
        </van-cell-group>
      </van-col>
      <van-col span="6">
        <van-image :style="{ height: '64px', width: '64px' }"  :src="item.img1v1Url" ></van-image
      ></van-col>
    </van-row>
  </div>
</template>

<script lang="ts">
export default {
  props: ['compData'],
  setup(props: any) {
    let state = {
      fireicon: '',
    }
    console.log(props.compData)

    return { state }
  },
}
</script>

<style lang="less" scope>
.van-grid {
  // @grid-item-content-background-color: '@white';
  background: white;
}
/deep/ .van-grid-item__content {
  padding: 0;
  background: white;
}
</style>
