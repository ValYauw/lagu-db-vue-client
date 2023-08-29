<script>
import { mapState, mapActions } from 'pinia';
import { useFetchDataStore } from '@/stores/fetchData';

import GenreCard from '../components/SongCard/GenreCard.vue';
import PlayLink from '../components/SongCard/PlayLink.vue';
import ArtistLink from '../components/SongCard/ArtistLink.vue';
import YouTubeEmbed from '../components/Embeds/YouTubeEmbed.vue';
import TimedLyrics from '../components/SongDetails/TimedLyrics.vue';

export default {
  name: 'SongDetailView',
  components: {
    GenreCard,
    PlayLink,
    ArtistLink,
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
      return this.song?.TimedLyrics?.length ? this.song.TimedLyrics[0] : null;
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
    console.log(this.song.TimedLyrics);
  }
}
</script>

<template>

<v-sheet class="bg-deep-purple pa-12" height="100%">

  <v-card class="mx-auto">

  <div>

    <YouTubeEmbed 
      :videoId="youtubeVideoUrl" 
      @send-current-time="setCurrentPlayTime"
    />

    <PlayLink
      v-for="playLink in song?.PlayLinks" 
      v-bind="playLink" 
    />

  </div>

  <div>
    <TimedLyrics 
      :timedLyrics="timedLyrics"
      :currentTime="currentTime"
    />
  </div>

  <div>

    <v-card-title class="text-h5">
      {{ song?.name }}
    </v-card-title>

    <v-card-subtitle>
      <p v-if="song?.aliases">
        Also known as:
        <span v-html="renderedAliases"></span>
      </p>
    </v-card-subtitle>

    <v-chip-group>
      <ArtistLink 
        v-for="artist in song?.Artists" 
        v-bind="artist" 
      />
    </v-chip-group>

    <v-chip-group>
      <GenreCard 
        v-for="genre in song?.Genres" 
        v-bind="genre" 
      />
    </v-chip-group>
    
  </div>

  </v-card>

</v-sheet>

</template>