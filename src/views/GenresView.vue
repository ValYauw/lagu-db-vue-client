<script>
import { mapState, mapActions } from 'pinia';
import { useFetchDataStore } from '@/stores/fetchData';

import Loader from '../components/Loader.vue';
import GenreCard from '../components/GenreCard/GenreCard.vue';

export default {
  name: 'GenresView',
  components: { 
    Loader,
    GenreCard
  },
  data() {
    return {
      genres: []
    }
  },
  computed: {
    ...mapState(useFetchDataStore, ['isLoading'])
  },
  methods: {
    ...mapActions(useFetchDataStore, ['getGenres'])
  },
  async created() {
    const data = await this.getGenres();
    this.genres = data;
  }
}
</script>

<template>

<v-sheet class="bg-deep-orange-darken-4 pa-12" height="100%">

  <v-card class="bg-brown-lighten-5 mx-auto px-6 py-8" max-width="900px">
    <h1 class="brand">All Genres</h1>

    <Loader :isLoading="isLoading" v-if="isLoading" />

    <GenreCard 
      v-for="genre in genres" 
      v-bind="genre" 
    />

  </v-card>

</v-sheet>

</template>