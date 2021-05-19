<template>
  <router-view v-if="data.isRouterAlive" v-slot="{ Component }">
    <keep-alive :include="cachedViews" :exclude="normalViews">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload,
    }
  },
  setup() {
    let cachedViews = ['home']
    let normalViews = ['lyrics', 'videoplay']
    const data = reactive({ isRouterAlive: true,})
    function router(to, from) {
      if (!cachedViews.includes(to.name) && !normalViews.includes(to.name)) {
        cachedViews.push(to.name)
      }
    }
    return { cachedViews, normalViews, data }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {this.isRouterAlive = true })
    },
  },
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
  /* background: rgb(98, 22, 36); */
  /* margin-top: 60px; */
}
.van-grid-item__content {
  background: white;
}
</style>
