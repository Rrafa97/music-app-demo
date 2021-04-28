<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="cachedViews" :exclude="normalViews">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
import { watch } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'App',
  setup () {
    let cachedViews = ['home']
    let normalViews = ['lyrics']
    function router (to, from) {
      if (!cachedViews.includes(to.name) && !normalViews.includes(to.name)) {
        cachedViews.push(to.name)
      }
    }
    watch((useRouter().to, useRouter().from), () => {router()})
    return { cachedViews, normalViews }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  background: rgb(98, 22, 36);
  /* margin-top: 60px; */
}
</style>
