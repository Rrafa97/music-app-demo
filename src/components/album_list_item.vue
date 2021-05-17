<template>
  <div>
    <div v-for="item in compData.albums" :style="{ margin: '16px' }">
      <van-row :style="{ color: 'rgb(54, 41, 47)' }">
        <van-col span="8">
          <van-image :style="{ height: '64px', width: '64px' }"  :src="item.blurPicUrl" ></van-image>
          <van-image :style="{ height: '64px',  width: '64px',  position: 'absolute',  left: '48px',  zIndex: '-1',  }"  :src="require('../assets/images/albac.png')" ></van-image>
        </van-col>
        <van-col span="16" class="col-flex">
          <div>
            <span :style="{ maring: '8px 0', fontSize: '16px' }">{{  item.name  }}</span>
          </div>
          <span :style="{ color: 'rgb(18, 110, 130)', fontSize: '12px' }">{{ item.artist.name }}</span>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ['compData'],
  setup(props: any) {
    // console.log(props.compData);
  },
}
</script>

<style>
.col-flex {
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: rgb(54, 41, 47); */
}
</style>
