<script>
import { mapState, mapActions } from 'pinia';
import { useFetchDataStore } from '@/stores/fetchData';

import Loader from '../components/Loader.vue';
import ArtistCard from '../components/ArtistCard/ArtistCard.vue';

export default {
  name: 'SongsView',
  components: { 
    Loader,
    ArtistCard
  },
  data() {
    return {
      artists: [],
      count: null,
      numPages: 0,
      currentPage: 0
    }
  },
  computed: {
    ...mapState(useFetchDataStore, ['isLoading'])
  },
  methods: {
    ...mapActions(useFetchDataStore, ['getArtists'])
  },
  watch: {
    async currentPage(newValue, oldValue) {
      if (!this.artists[newValue - 1]) {
        const data = await this.getArtists(newValue);
        this.count = data.count;
        this.numPages = Math.ceil(data.count / 20);
        this.artists[newValue - 1] = data.data;
      }
    }
  },
  async created() {
    const data = await this.getArtists();
    this.count = data.count;
    this.numPages = Math.ceil(data.count / 20);
    this.artists = new Array(this.numPages).fill(null);
    this.artists[0] = data.data;
    this.currentPage = 1;
  }
}
</script>

<template>

<v-sheet class="bg-deep-orange-darken-4 pa-12" height="100%">

  <v-card class="bg-brown-lighten-5 mx-auto px-6 py-8" max-width="900px">
    <h1 class="brand">All Artists</h1>

    <Loader :isLoading="isLoading" v-if="isLoading" />

    <ArtistCard 
      v-for="artist in artists[currentPage-1]" 
      v-bind="artist" 
    />

    <v-pagination 
      v-if="count"
      v-model="currentPage"
      :length="numPages"
    />

  </v-card>

</v-sheet>

</template>