<template>
  <div class="bacg-abs">
  </div>
</template>

<script>
export default {
  setup() {
    console.log(this.$route.query.id)
  }
}
</script>

<style lang="scss" scoped>
.bacg-abs {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: white;
  background: rgba($color: #000000, $alpha: 0);
}
</style>