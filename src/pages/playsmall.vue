<template lang="">
  <div>
          <div class="mask-play">
        <!-- <router-link :to="{name: 'lyrics',query: { id: playInfo.id}}"> -->
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
        </p>
        <!-- </router-link> -->
        <audio v-if="playShow" controls>
          <source :src="currentMp3" type="audio/mpeg" />
        </audio>
      </div>
  </div>
</template>