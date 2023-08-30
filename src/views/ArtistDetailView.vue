<script>
import { mapState, mapActions } from 'pinia';
import { useFetchDataStore } from '@/stores/fetchData';

import ArtistExternalLinks from '../components/ArtistCard/ArtistExternalLinks.vue';
import SongCard from '../components/SongCard/SongCard.vue';

import YouTubeReport from '../components/ArtistDetails/YouTubeReport.vue';
import VocadbReport from '../components/ArtistDetails/VocadbReport.vue';

export default {
  name: 'ArtistDetailView',
  components: {
    ArtistExternalLinks,
    SongCard,
    YouTubeReport,
    VocadbReport
  },
  data() {
    return {
      artist: null,
      songs: [],
      count: null,
      numPages: 0,
      currentPage: 0,
      // albums: []

      ytRecentVideos: null,
      vocadbReport: null
    }
  },
  props: {
    id: String
  },
  computed: {
    ...mapState(useFetchDataStore, ['isLoading']),
    pageData() {
      return this.songs[this.currentPage - 1];
    },
    renderedDate() {
      return new Intl.DateTimeFormat('en-US', { 
        dateStyle: 'long' 
      }).format(new Date(this.releaseDate))
    },
    renderedAliases() {
      return this.artist?.aliases ? this.artist?.aliases?.map(alias => {
        return `<span class="alias">${alias}</span>`
      }).join(', ') : null;
    },
  },
  methods: {
    ...mapActions(useFetchDataStore, [
      'getArtist', 'getSongsByArtist', 'getAlbumsByArtist',
      'getRecentYouTubeVideos', 'getPopularRatedVocaDBSongs'
    ]),
  },
  watch: {
    artist(newValue, oldValue) {
      for (let link of newValue?.ArtistLinks) {
        const { webURL } = link;
        if (/^https?:\/\/www\.youtube\.com\/channel\//.exec(webURL)) {
          this.getRecentYouTubeVideos(webURL)
            .then((data) => this.ytRecentVideos = data);
        } else if (/^https?:\/\/vocadb.net\/Ar\//.exec(webURL)) {
          this.getPopularRatedVocaDBSongs(webURL)
            .then((data) => this.vocadbReport = data);
        }
      }
    }
  },
  created() {
    const id = this.id;
    this.getArtist(id).then((data) => this.artist = data);
    this.getSongsByArtist(id).then((data) => {
      this.count = data.count;
      this.numPages = Math.ceil(data.count / 20);
      this.songs = new Array(this.numPages).fill(null);
      this.songs[0] = data.data;
      this.currentPage = 1;
    });
    // this.getAlbumsByArtist(id).then((data) => this.albums = data);
  }
}
</script>

<template>

<v-sheet class="bg-deep-purple pa-12" height="100%">

  <v-card class="mx-auto px-6 py-8" max-width="900px">

    <div class="flex-container">

      <div>
        <v-img 
          :src="artist?.imageURL" 
          :width="300" 
          aspect-ratio="1/1"
          cover
        >
        </v-img>
      </div>

      <ArtistExternalLinks :ArtistLinks="artist?.ArtistLinks" />

    </div>

    <div>

      <v-card-title class="text-h5">
        {{ artist?.name }}
      </v-card-title>

      <v-card-subtitle>
        <p v-if="artist?.aliases">
          Also known as:
          <span v-html="renderedAliases"></span>
        </p>
      </v-card-subtitle>

      <v-card-text>
        {{ artist?.description }}
      </v-card-text>

    </div>

    <div class="items">

      <YouTubeReport v-bind="ytRecentVideos" v-if="ytRecentVideos" />

      <VocadbReport v-bind="{data:vocadbReport}" v-if="vocadbReport" />

      <v-card elevation="5">

        <v-card-title>
          All songs by artist
        </v-card-title>
        <Loader :isLoading="isLoading" v-if="isLoading" />
        <SongCard
          v-for="song in pageData" 
          v-bind="song"
        />

        <v-pagination 
          v-if="count"
          v-model="currentPage"
          :length="numPages"
        />

      </v-card>

    </div>

  </v-card>

</v-sheet>

</template>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0px 40px;
  margin-bottom: 20px;
}
.items {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px 0px;
}
</style>