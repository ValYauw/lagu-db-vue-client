<script>
export default {
  props: {
    videoId: String
  },
  data() {
    return {
      player: null,
      currentTime: 0
    }
  },
  emits: ['sendCurrentTime'],
  watch: {
    videoId(newValue, oldValue) {
      if (newValue) {
        // await this.$loadScript("/youtube-player.js");
        this.embed();
      } 
    }
  },
  methods: {
    embed() {

      if (!this.videoId) {
        document.getElementById('player').innerHTML = 'No video available';
        return;
      }

      let tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      let firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      let player;

      window.onYouTubeIframeAPIReady = () => {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: this.videoId,
          playerVars: {
            'playsinline': 1
          }
        });
        this.player = player;
        setInterval(() => {
          this.currentTime = player.getCurrentTime();
          this.$emit('sendCurrentTime', this.currentTime);
        }, 200);
      }

    }
  }
}
</script>

<template>
  <div id="player" :video-src="videoId"></div>
</template>

<style scoped>
#player {
  width: 650px;
  height: 400px;
  background-color: black;
  margin: 10px;
}
</style>