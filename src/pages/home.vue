<template>
   <div class="block">
     11111
    <el-carousel height="80vh">
      <el-carousel-item v-for="item in imgurl" :key="item">
         <el-image
      style="width: 100%;"
      :src="item"
      :fit="fit"></el-image>
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
};
</script>

<style lang="scss" scoped>
.block {
  height: auto;
  background: #151618;
  padding-top: 32px;
}
 .el-carousel__item h3 {
    color: #151618;
    background: #151618;
    font-size: 14px;
    line-height: 150px;
    margin: 0;
  }
</style>