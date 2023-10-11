<script>
import { mapState, mapActions } from 'pinia';
import { useFetchDataStore } from '@/stores/fetchData';

import SongCard from '../components/SongCard/SongCard.vue';

import { NUM_SONGS_PER_PAGE } from '../config/pagination';

export default {
  name: 'GenreDetailView',
  components: {
    SongCard
  },
  data() {
    return {
      name: null,
      subGenres: [],
      parentGenre: null,
      songs: [],
      count: null,
      numPages: 0,
      currentPage: 1
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
  },
  methods: {
    ...mapActions(useFetchDataStore, ['getGenre', 'getSongsByGenre']),
    fetchData(id) {
      this.getGenre(id).then((data) => {
        this.name = data.name;
        this.subGenres = data.subGenres;
        this.parentGenre = data.parentGenre;
      });
      this.getSongsByGenre(id).then((data) => {
        this.count = data.count;
        this.numPages = Math.ceil(data.count / NUM_SONGS_PER_PAGE);
        this.songs = new Array(this.numPages).fill(null);
        this.songs[0] = data.data;
        this.currentPage = 1;
        console.log(id, data);
        console.log(this.count, this.numPages);
        console.log(this.songs, this.pageData);
      });
    }
  },
  watch: {
    async currentPage(newValue, oldValue) {
      if (!this.songs[newValue - 1]) {
        const data = await this.getSongsByGenre(this.id, newValue);
        this.count = data.count;
        this.numPages = Math.ceil(data.count / NUM_SONGS_PER_PAGE);
        this.songs[newValue - 1] = data.data;
      }
    }
  },
  created() {
    this.fetchData(this.id);
  }, 
  async beforeRouteUpdate(to, from) {
    this.fetchData(to.params.id);
  }
}
</script>

<template>

<v-sheet class="bg-deep-orange-darken-4 pa-12" height="100%">

  <v-card class="bg-brown-lighten-5 mx-auto px-6 py-8" max-width="900px">

    <div>

      <v-card-title class="text-h5">
        {{ name }}
      </v-card-title>

      <v-card-subtitle>
        <p v-if="parentGenre">
          <i>Subgenre of <RouterLink :to="`/genres/${parentGenre.id}`">{{ parentGenre.name }}</RouterLink></i>
        </p>
      </v-card-subtitle>

      <v-card-subtitle class="mt-5 mb-0" v-if="subGenres?.length"><i>Related sub-genres:</i></v-card-subtitle>
      <v-card-text class="mt-0">
        <v-chip
          class="ma-2"
          variant="outlined"
          v-for="subGenre in subGenres"
          :key="subGenre.id"
        >
          <RouterLink :to="`/genres/${subGenre.id}`">
            {{ subGenre.name }}
          </RouterLink>
        </v-chip>
      </v-card-text>

    </div>

    <div class="items">

      <v-card class="bg-deep-orange-lighten-4 elevation-5">

        <v-card-title>
          All songs under "{{ name }}"
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