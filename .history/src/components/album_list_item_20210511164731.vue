<template>
  <div>
    <!-- qweqwe
    {{ compData }} -->
    <div v-for="item in compData.albums">
      <van-card
        :desc="'发行商：' + item.company"
        :title="item.name"
        :thumb="item.blurPicUrl"
      >
      <template #title>
        <div><span :style="{maring: '8px 0',fontSize: '18px'}">{{item.name}}</span> <span>{{item.artist.name}}</span> </div>
      </template>
      <template #desc>
        <div>{{item.artist.name}}作品集：{{item.artist.albumSize}}</div>
        <div :style="{color: 'rgb(236, 44, 100)'}">{{item.company}}</div>
      </template>
      <template #thumb>
        <van-image :src='item.blurPicUrl'></van-image>
      </template>
      </van-card>
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