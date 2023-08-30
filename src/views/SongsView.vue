<script>
import { mapState, mapActions } from 'pinia';
import { useFetchDataStore } from '@/stores/fetchData';

import Loader from '../components/Loader.vue';
import SongCard from '../components/SongCard/SongCard.vue';

export default {
  name: 'SongsView',
  components: { 
    Loader,
    SongCard,
  },
  data() {
    return {
      songs: [],
      count: null,
      numPages: 0,
      currentPage: 0
    }
  },
  computed: {
    ...mapState(useFetchDataStore, ['isLoading'])
  },
  methods: {
    ...mapActions(useFetchDataStore, ['getSongs'])
  },
  watch: {
    async currentPage(newValue, oldValue) {
      if (!this.songs[newValue - 1]) {
        const data = await this.getSongs(newValue);
        this.count = data.count;
        this.numPages = Math.ceil(data.count / 20);
        this.songs[newValue - 1] = data.data;
      }
    }
  },
  async created() {
    const data = await this.getSongs();
    this.count = data.count;
    this.numPages = Math.ceil(data.count / 20);
    this.songs = new Array(this.numPages).fill(null);
    this.songs[0] = data.data;
    this.currentPage = 1;
    // console.log(this.songs);
  }
}
</script>

<template>

<v-sheet class="bg-deep-orange-darken-4 pa-12" height="100%">

  <v-card class="bg-brown-lighten-5 mx-auto px-6 py-8" max-width="900px">
    <h1 class="brand">All Songs</h1>

    <Loader :isLoading="isLoading" v-if="isLoading" />

    <SongCard 
      v-for="song in songs[currentPage-1]" 
      v-bind="song"
    />

    <v-pagination 
      v-if="count"
      v-model="currentPage"
      :length="numPages"
    />

  </v-card>

</v-sheet>

</template>