<script>
export default {
  name: 'TimedLyrics',
  props: {
    timedLyrics: Array,
    currentTime: Number,
  },
  data() {
    return {
      lastTimedLyricsIndex: 0,
      currentTimedLyricsIndex: null,
      currentTimedLyrics: null
    }
  },
  computed: {
    numLines() {
      return this.timedLyrics.length;
    }
  },
  watch: {
    timedLyrics(newValue, oldValue) {
      if (newValue) {
        let { startTime, endTime } = newValue[0];
        if (this.currentTime > startTime && this.currentTime < endTime) {
          this.currentTimedLyricsIndex = 0;
          this.currentTimedLyrics = newValue[0];
        }
      }
    },
    currentTime(newValue, oldValue) {
      let currentTime = newValue * 1000;
      let currentTimedLyricsIndex = this.currentTimedLyricsIndex;
      let lastTimedLyricsIndex = currentTimedLyricsIndex;
      let { startTime, endTime } = this.timedLyrics[currentTimedLyricsIndex ? currentTimedLyricsIndex : 0];

      // still on current line
      if (currentTime > startTime && currentTime < endTime) {
        if (currentTimedLyricsIndex === null) this.currentTimedLyricsIndex = 0;
        return;
      }
      // Play backwards
      if (currentTime < startTime) {
        if (currentTime <= this.timedLyrics[0].startTime) {
          // not yet moved to first line
          this.currentTimedLyricsIndex = null;
          return;
        } else if (currentTime < this.timedLyrics[0].endTime) {
          // still on first line
          this.currentTimedLyricsIndex = 0;
          return;
        }
        // reset
        currentTimedLyricsIndex = 0;
      }

      // Find closest next line
      let found = false;
      let cachedCurrentTimedLyricsIndex = currentTimedLyricsIndex;
      while (currentTimedLyricsIndex < this.numLines - 1) {
        currentTimedLyricsIndex++;
        const { startTime, endTime } = this.timedLyrics[currentTimedLyricsIndex];
        if (currentTime >= startTime && currentTime < endTime) {
          found = true;
          break;
        }
      }

      if (found) {
        // Save variables
        this.currentTimedLyricsIndex = currentTimedLyricsIndex;
        this.lastTimedLyricsIndex = currentTimedLyricsIndex > 0 ? currentTimedLyricsIndex - 1 : 0;
        this.currentTimedLyrics = this.timedLyrics[currentTimedLyricsIndex];
      } else {
        this.lastTimedLyricsIndex = lastTimedLyricsIndex;
        this.currentTimedLyrics = null;
      }

    }
  }
}
</script>

<template>
<!-- <div>{{ currentTimedLyrics?.text }}</div> -->

  <v-list lines="one" id="lyrics">
    <v-list-item
      v-for="(timedLyric, index) in timedLyrics"
      :key="index"
      :class="(index === currentTimedLyricsIndex) ? 'active' : null"
      :title="timedLyric.text"
    >
    </v-list-item>
  </v-list>

</template>

<style scoped>
#lyrics {
  height: 80vh;
  overflow-y: scroll;
}
#lyrics > .active {
  background-color: rgba(178, 166, 56, 0.6);
}
</style>