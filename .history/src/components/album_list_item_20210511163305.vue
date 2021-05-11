<template>
  <div>
    <!-- qweqwe
    {{ compData }} -->
    <div v-for="item in compData.albums">
      <van-card
        num="2"
        price="2.00"
        :desc="'发行商：' + item.company"
        title="商品标题"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
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