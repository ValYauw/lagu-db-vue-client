<script>
export default {
  props: {
    videoId: String
  },
  data() {
    return {
      player: null,
      currentTime: 0,
    }
  },
  emits: ['sendCurrentTime'],
  watch: {
    videoId(newValue, oldValue) {
      if (newValue) {
        // await this.$loadScript("/youtube-player.js");
        console.log('Changed value', newValue, oldValue);
        this.embed(newValue);
      } 
    }
  },
  methods: {
    embed(videoId) {

      console.log("Embedding", videoId, this.player);

      if (!videoId) {
        return;
      }

      let player;

      const setupPlayer = () => {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: videoId,
          playerVars: {
            'playsinline': 1
          }
        });
        setInterval(() => {
          if (!player) return;
          let currentTime = player?.getCurrentTime();
          this.currentTime = currentTime;
          if (currentTime) this.$emit('sendCurrentTime', currentTime);
        }, 200);
      }

      let tag;
      if (document.getElementById('yt-iframe-src')) {
        // If already loaded
        tag = document.getElementById('yt-iframe-src');
        setupPlayer();
      } else {

        // Set up YT API scripts
        tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.id = "yt-iframe-src";
        let firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Load player on ready
        window.onYouTubeIframeAPIReady = setupPlayer;
      }

    }
  },
  created() {
    if (this.videoId) {
      this.embed();
    } 
  },
  async unmounted() {
    await this.player.destroy();
  }
}
</script>

<template>
  <div id="player" :video-src="videoId">
    <span v-if="!videoId">No video available</span>
  </div>
</template>

<style scoped>
#player {
  width: 650px;
  height: 400px;
  background-color: black;
  margin: 10px;
  text-align: center;
  vertical-align: middle;
}
</style>