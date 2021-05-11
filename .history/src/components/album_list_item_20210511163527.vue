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
      <template #thumb>
        111
        <van-img :src='item.blurPicUrl'></van-img>
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