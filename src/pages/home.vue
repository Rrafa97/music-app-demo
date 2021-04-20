<template>
  <div class="block" @touchstart="touchstart" @touchmove="touchmove">
    <el-carousel height="100vh">
      <el-carousel-item v-for="item in imgurl" :key="item">
        <el-image style="width: 100%" :src="item" :fit="fit"></el-image>
      </el-carousel-item>
    </el-carousel>
    <div class="background"></div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      imgurl: [
        require("@/assets/images/home_ad1.png"),
        require("@/assets/images/home_ad2.png"),
        require("@/assets/images/home_ad3.png"),
      ],
    };
  },
  setup() {},
  methods: {
    touch() {},
    touchstart(e) {
      // 如果你要阻止点击事件，请反注释下一行代码this
      // e.preventDefault()
      this.startX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
    },
    touchmove(e) {
    
      // e.preventDefault()
      this.moveX = e.touches[0].clientX;
      this.moveY = e.touches[0].clientY;
      this.startX - this.moveX <= 0
        ? this.$refs.carousel.prev()
        : this.$refs.carousel.next()
      if (this.startX - this.moveX <= -100) {
        // 右滑触发
        // do something
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.block {
  height: auto;
  background: #151618;
}
.el-carousel__item h3 {
  color: #151618;
  background: #151618;
  font-size: 14px;
  line-height: 150px;
  margin: 0;
}
</style>