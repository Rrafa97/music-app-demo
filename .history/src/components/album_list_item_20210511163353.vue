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
        <template #tags>
          <van-tag plain type="danger">标签</van-tag>
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