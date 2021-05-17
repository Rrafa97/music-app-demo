<template>
  <div v-for="item in compData.playlists">
    <van-image width="6rem" height="6rem" fit="cover" :src="item.coverImgUrl" />
  </div>
</template>

<script lang="ts">
export default {
  props: ['compData'],
  setup(props: any) {
    let state = {
      fireicon: '',
    }
    console.log(props.compData)

    return { state }
  },
}
</script>
