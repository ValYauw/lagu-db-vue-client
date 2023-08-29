<script>
import { mapState, mapActions } from 'pinia';
import { useFetchDataStore } from '@/stores/fetchData';

import Loader from '../components/Loader.vue';
import SongCard from '../components/SongCard/SongCard.vue';

export default {
  name: 'SongsView',
  components: { 
    Loader,
    SongCard
  },
  computed: {
    ...mapState(useFetchDataStore, ['isLoading', 'songs', 'songsCount'])
  },
  methods: {
    ...mapActions(useFetchDataStore, ['getSongs'])
  },
  created() {
    this.getSongs(true);
  }
}
</script>

<template>

<v-sheet class="bg-deep-purple pa-12" height="100%">

  <v-card class="mx-auto px-6 py-8" max-width="900px">
    <h1 class="brand">All Songs</h1>
    <Loader :isLoading="isLoading" v-if="isLoading" />
    <SongCard v-for="song in songs" v-bind="song" />
  </v-card>

</v-sheet>

</template>