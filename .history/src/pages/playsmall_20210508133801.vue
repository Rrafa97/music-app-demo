<template lang="">
  <div>111
        <audio controls>
          <source :src="currentMp3" type="audio/mpeg" />
        </audio>
      <!-- </div> -->
  </div>
</template>

<script lang="js">
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