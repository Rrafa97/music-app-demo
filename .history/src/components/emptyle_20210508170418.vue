<template>
  <div :style="{position: 'relative'}">
    <van-empty class="van-empty-box">
      <template #description>
        <van-loading size="36px" color="white" vertical
          >正在加载...</van-loading
        >
      </template>
    </van-empty>
  </div>
</template>

<style lang="less" scoped>
.van-empty-box {
  // position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
}
</style>