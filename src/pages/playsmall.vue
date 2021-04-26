<template lang="">
  <div>
    <!-- {{playInfo}} -->
          <!-- <div class="mask-play">
        <p @click="toSongs">
          {{
            "‘" +
            playInfo.name +
            "’" +
            "-" +
            playInfo.ar[0].name +
            "——专辑:" +
            playInfo.al.name
          }}
        </p> -->
        <audio controls>
          <source :src="currentMp3" type="audio/mpeg" />
        </audio>
      <!-- </div> -->
  </div>
</template>

<script lang="ts">
import { GET_LYRIC, GET_SONG } from "../api/index.js";
export default {
  props: { playInfo: Object },
  data() {
    return {
      currentMp3: ''
    }
  },
  setup() {
    const play = "";
  },
  mounted() {
    GET_SONG(this.playInfo.id).then((res) => {
            console.log(res.data.data[0].url);
      this.currentMp3 = res.data.data[0].url
    });
    console.log(this.playInfo);
  },
};
</script>