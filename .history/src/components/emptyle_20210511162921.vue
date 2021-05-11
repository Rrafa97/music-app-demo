<template>
  <div class="van-empty-box">
    <van-empty>
      <template #description>
        <van-loading size="36px" vertical
          >正在加载...</van-loading
        >
      </template>
    </van-empty>
  </div>
</template>

<style lang="less" scoped>
.van-empty-box {
  margin-top: 20vh;
  margin-bottom: 30vh;
  background: rgba(0, 0, 0, 0);
}
</style>