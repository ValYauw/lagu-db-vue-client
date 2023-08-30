<script>
import { mapState, mapActions } from 'pinia';
import { useFetchDataStore } from '@/stores/fetchData';

import ArtistExternalLinks from '../components/ArtistCard/ArtistExternalLinks.vue';
import SongCard from '../components/SongCard/SongCard.vue';

export default {
  name: 'ArtistDetailView',
  components: {
    ArtistExternalLinks,
    SongCard
  },
  data() {
    return {
      artist: null,
      songs: [],
      albums: []
    }
  },
  props: {
    id: String
  },
  computed: {
    ...mapState(useFetchDataStore, ['isLoading']),
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
    ...mapActions(useFetchDataStore, ['getArtist', 'getSongsByArtist', 'getAlbumsByArtist']),
  },
  async created() {
    const id = this.id;
    this.getArtist(id).then((data) => this.artist = data);
    this.getSongsByArtist(id).then((data) => this.songs = data);
    this.getAlbumsByArtist(id).then((data) => this.albums = data);
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

    <Loader :isLoading="isLoading" v-if="isLoading" />
    <SongCard
      v-for="song in songs.data"
      v-bind="song"
    />

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
</style>