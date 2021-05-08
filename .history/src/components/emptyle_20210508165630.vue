<template>
  <div class="van-empty-box">
    <van-empty>
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
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>