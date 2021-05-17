<template>
  <div>
    <van-grid id="van-grid" :style="{background:'white'}" :column-num="2">
      <van-grid-item v-for="item in compData.artists">
        <!-- <template #icon> -->
          <van-image :style="{ height: '64px',width: '64px' }" :src=item.img1v1Url></van-image>
        <!-- </template> -->
        <!-- {{item.img1v1Url}} -->
        <p :style="{fontSize:'12px'}">{{item.name}}</p>
        </van-grid-item>
</van-grid>
    11{{compData}}
    
  </div>
</template>

<script lang="ts">
export default {
  props: ["compData"],
  setup(props: any) {
    console.log(props.compData);
  },
}
</script>

<style lang="less">
#van-grid {
  // @grid-item-content-background-color: '@white';
  background: white;
}
/deep/ .van-grid-item__content {
  padding: 0;
}
</style>