<template>
  <div>
    11{{compData}}
  </div>
</template>

<script lang="ts">
export default {
  props: ["compData"],
  setup(props: any) {
    console.log(props.compData);
  },
}
</script>

<style lang="less" scoped>
div {
  color: black;
}
</style>