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
  computed: {
    ...mapState(useFetchDataStore, ['isLoading', 'artists', 'artistsCount'])
  },
  methods: {
    ...mapActions(useFetchDataStore, ['getArtists'])
  },
  created() {
    this.getArtists(true);
  }
}
</script>

<template>

<v-sheet class="bg-deep-purple pa-12" height="100%">

  <h1 class="brand">All Artists</h1>

  <v-card class="mx-auto px-6 py-8" max-width="900px">
    <Loader :isLoading="isLoading" v-if="isLoading" />
    <ArtistCard v-for="artist in artists" v-bind="artist" />
  </v-card>

</v-sheet>

</template>