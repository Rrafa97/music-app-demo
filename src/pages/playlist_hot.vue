<template>
  <div>
    <!-- <van-tabs v-model:active="active" swipeable>
      <van-tab v-for="(index,item,i) in playListCategories" :title="index">
        item
      </van-tab>
    </van-tabs> -->
    <div v-if="Object.keys(playListCategories).length > 1" v-for="(item,i) in playListCategories">
      {{1111}}
    </div>
  </div>
</template>

<script lang="ts">
import {PLAYLIST_CATLIST} from '@/api/index'
import { onMounted } from 'vue';
export default {
  setup() {
    var playListCategories: Array<string> = []
    PLAYLIST_CATLIST().then( res=> {
      
      playListCategories = res.data.categories
      console.log(playListCategories)
    })
    onMounted( () => {
      setTimeout(() => {
         console.log(Object.keys(playListCategories).length)
      }, 300);
      console.log(playListCategories)
    })
    return {playListCategories}
  },
};
</script>