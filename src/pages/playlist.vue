<template>
  <div>
    
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
export default {
  setup() {
    const pinfo:any = useRoute().query.playlistinfo
    console.log(JSON.parse(pinfo))
  }
}
</script>