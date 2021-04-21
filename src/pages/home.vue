<template>
  <div class="block" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
    <el-carousel height="100vh" ref="carousel" :loop='false'>
      <el-carousel-item v-for="(item,index) in imgurl" :key="item">
        <el-image style="width: 100%" :src="item" @click='adClick(index)'></el-image>
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
      startPoint: [],
      endPoint: []
    };
  },
  setup() {},
  methods: {
    touch() {},
    touchstart(e) {
      // 如果你要阻止点击事件，请反注释下一行代码this
      // e.preventDefault()
      let startPoint =[]
      this.startX = e.changedTouches[0].clientX;
      this.startY = e.changedTouches[0].clientY;
      startPoint = [e.changedTouches[0].clientX,e.changedTouches[0].clientY]
      this.startPoint = [e.changedTouches[0].clientX,e.changedTouches[0].clientY]
      return e
    },
    touchstartRes() {
    },

    touchmove(e) {
      let that = this
    },
    touchend(e) {
      this.touchstartRes()
      this.endPoint = [e.changedTouches[0].clientX,e.changedTouches[0].clientY]
      this.endPoint[0] - this.startPoint[0] > 20?this.$refs.carousel.prev() : false
      this.endPoint[0] - this.startPoint[0] < -20?this.$refs.carousel.next() : false
    },
    adClick(i) {
      i === 2 ? console.log('登陆操作') : false
    }
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