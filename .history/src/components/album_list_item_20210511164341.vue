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
      desc
      <template #desc>
        <div>{{item.artist.name}}作品集：{{item.artist.albumSize}}</div>
        <div>{{item.company}}</div>
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