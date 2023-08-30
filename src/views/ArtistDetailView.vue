<script>
import { mapState, mapActions } from 'pinia';
import { useFetchDataStore } from '@/stores/fetchData';

import ArtistLink from '../components/ArtistCard/ArtistLink.vue';
import SongCard from '../components/SongCard/SongCard.vue';

export default {
  name: 'ArtistDetailView',
  components: {
    ArtistLink,
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

  <v-card class="mx-auto">

    <div>
      <img :src="artist?.imageURL" width="200px" height="200px" />
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

      <v-card-text>
        <ArtistLink v-for="link in artist.ArtistLinks" v-bind="link" />
      </v-card-text>

    </div>

  </v-card>

  <SongCard
    v-for="song in songs.data"
    v-bind="song"
  />

</v-sheet>

</template>