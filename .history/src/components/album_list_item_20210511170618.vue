<template>
  <div>
    <!-- qweqwe
    {{ compData }} -->
    <div v-for="item in compData.albums" :style="{margin:'16px'}">
      <van-row :style="{ color: 'rgb(54, 41, 47)' }">
        <van-col span="8">
          <van-image
            :style="{ height: '64px',width: '64px' }"
            :src="item.blurPicUrl"
          ></van-image>
          <van-image src="../assets/imges/albac.png"></van-image>
        </van-col>
        <van-col span="16">
          <div>
            <span :style="{ maring: '8px 0', fontSize: '16px' }">{{
              item.name
            }}</span>
          </div>
          <span :style="{ color: 'rgb(18, 110, 130)', fontSize: '12px' }">{{ item.artist.name }}</span>
        </van-col>
        <!-- <van-col span="8">span: 8</van-col> -->
      </van-row>
      <!-- <van-card
        :desc="'发行商：' + item.company"
        :title="item.name"
        :thumb="item.blurPicUrl"
      >
      <template #title>
        <div><span :style="{maring: '8px 0',fontSize: '18px'}">{{item.name}}</span> <span>{{item.artist.name}}</span> </div>
      </template>
      <template #desc>
        <div :style="{color: 'rgb(236, 44, 100)'}">{{item.company}}</div>
      </template>
      <template #thumb :style="{width:'48px', height:'48px'}">
        <van-image :src='item.blurPicUrl'></van-image>
      </template>
      </van-card> -->
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ["compData"],
  setup(props: any) {
    console.log(props.compData);
  },
};
</script>