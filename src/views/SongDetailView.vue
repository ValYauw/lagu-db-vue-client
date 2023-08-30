<script>
import { mapState, mapActions } from 'pinia';
import { useFetchDataStore } from '@/stores/fetchData';

import YouTubeEmbed from '../components/Embeds/YouTubeEmbed.vue';
import TimedLyrics from '../components/SongDetails/TimedLyrics.vue';
import TableSongData from '../components/SongDetails/TableSongData.vue';

export default {
  name: 'SongDetailView',
  components: {
    TableSongData,
    YouTubeEmbed,
    TimedLyrics
  },
  data() {
    return {
      song: null,
      currentTime: null
    }
  },
  props: {
    id: String
  },
  computed: {
    renderedDate() {
      return new Intl.DateTimeFormat('en-US', { 
        dateStyle: 'long' 
      }).format(new Date(this.releaseDate))
    },
    renderedAliases() {
      return this.song?.aliases ? this.song.aliases?.map(alias => {
        return `<span class="alias">${alias}</span>`
      }).join(', ') : null;
    },
    timedLyrics() {
      return this.song?.TimedLyric ? this.song.TimedLyric.parsedSrt : null;
    },
    youtubeVideoUrl() {
      const regex = [
        /^https?:\/\/www\.youtube\.com\/watch\?v=([^&\*]+)/,
        /^https?:\/\/youtu\.be\/([^&\*]+)/
      ];

      let numPlayLinks = this.song?.PlayLinks ? this.song.PlayLinks.length : 0;
      let res;
      for (let i=0; i < numPlayLinks; i++) {
        const playLink = this.song.PlayLinks[i];
        for (let pattern of regex) {
          res = pattern.exec(playLink.songURL);
          if (res) break;
        }
        if (res) break;
      }

      return res ? res[1] : null;

    }
  },
  methods: {
    ...mapActions(useFetchDataStore, ['getSong']),
    setCurrentPlayTime(currentTime) {
      this.currentTime = currentTime;
    }
  },
  async created() {
    this.song = await this.getSong(this.id);
  }
}
</script>

<template>

<v-sheet class="bg-deep-purple pa-12" height="100%">

  <v-card class="mx-auto" id="container">

    <v-card-title class="text-h5">
      {{ song?.name }}
    </v-card-title>

    <v-card-subtitle>
      <p v-if="song?.aliases">
        Also known as:
        <span v-html="renderedAliases"></span>
      </p>
    </v-card-subtitle>

    <v-divider></v-divider>

    <div id="flex-container">

      <div id="playlinks" class="w-auto d-flex">

        <YouTubeEmbed
          :videoId="youtubeVideoUrl" 
          @send-current-time="setCurrentPlayTime"
        />

        <div id="info-table">
          <TableSongData 
            v-bind="{PlayLinks: song?.PlayLinks, Artists: song?.Artists, Genres: song?.Genres}"
          />
        </div>

      </div>

      <div id="right-container">

        <v-card-title class="text-h5">Lyrics</v-card-title>

        <TimedLyrics 
          :timedLyrics="timedLyrics"
          :currentTime="currentTime"
        />
        
      </div>

    </div>

  </v-card>

</v-sheet>

</template>

<style scoped>
#container {
  padding: 20px;
}
#playlinks { 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  max-width: fit-content;
  margin-right: 20px;
}
#right-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: auto;
  margin: 0px;
  max-width: 500px;
  height: 390px;
  max-height: 80vh;
  border: solid 1px rgba(128, 128, 128, 0.8);
}
#flex-container {
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}
#info-table {
  margin-top: 10px;
}
</style>