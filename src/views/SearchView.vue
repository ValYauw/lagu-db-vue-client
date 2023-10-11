<script>
import { mapState, mapActions } from 'pinia';
import { useFetchDataStore } from '@/stores/fetchData';

import Loader from '../components/Loader.vue';
import SearchCard from '../components/SearchCard/SearchCard.vue';

import { NUM_SEARCH_RESULTS_PER_PAGE } from '../config/pagination';

export default {
  name: 'SearchView',
  data() {
    return {
      term: '',
      entity: 'Song',
      count: null,
      numPages: 0,
      currentPage: 0,
      data: []
    }
  },
  components: {
    Loader,
    SearchCard
  },
  computed: {
    ...mapState(useFetchDataStore, ['isLoading']),
    pageData() {
      return this.data[this.currentPage - 1];
    }
  },
  methods: {
    ...mapActions(useFetchDataStore, ['search']),
    async prepareToSearch() {
      const entity = this.entity;
      const term = this.term;
      if (!['Song', 'Artist', 'Album'].includes(entity)) return;
      if (!term) return;
      const data = await this.search(term, entity.toLowerCase());
      this.count = data.count;
      this.numPages = Math.ceil(data.count / NUM_SEARCH_RESULTS_PER_PAGE);
      this.data = new Array(this.numPages).fill(null);
      this.data[0] = data.data;
      this.currentPage = 1;
      console.log(this.pageData);
    }
  },
  watch: {
    entity(newValue, oldValue) {
      this.prepareToSearch();
    },
    async currentPage(newValue, oldValue) {
      if (!this.data[newValue - 1]) {
        const data = await this.search(term, entity.toLowerCase(), newValue);
        this.count = data.count;
        this.numPages = Math.ceil(data.count / NUM_SEARCH_RESULTS_PER_PAGE);
        this.data[newValue - 1] = data.data;
      }
    }
  }
}
</script>

<template>

<v-sheet class="bg-deep-orange-darken-4 pa-12" height="100%">

  <v-toolbar id="toolbar"
    dense
    rounded
  >

    <v-select id="category"
      hide-details
      :items="['Song', 'Artist']"
      v-model="entity"
      style="max-width: 180px;"
      required
    ></v-select>

    <v-text-field id="search-bar"
      hide-details
      v-model="term"
      label="Search"
      :placeholder="`Search ${entity.toLowerCase()} by title`"
      single-line
      required
    ></v-text-field>

    <v-btn
      @click="prepareToSearch"
      size="large"
      rounded
    >
      <v-icon icon="mdi-magnify"></v-icon>
    </v-btn>

  </v-toolbar>

  <v-card class="bg-brown-lighten-5 mx-auto px-6 py-8">

    <Loader :isLoading="isLoading" v-if="isLoading" />

    <div v-if="count !== null">
      <h2 v-if="!isLoading && pageData.length === 0">Sorry, we couldn't find anything</h2>
      <div v-else>
        <h4>Found {{ count }} result(s).</h4>
        <SearchCard 
          v-for="datum in pageData"
          v-bind="{entity: this.entity, ...datum}"
        />
      </div>
    </div>

    <v-pagination 
      v-if="count"
      v-model="currentPage"
      :length="numPages"
    />

  </v-card>

</v-sheet>

</template>

<style scoped>
#toolbar {
  padding: 3px 15px 3px 8px;
  /* display: flex;
  justify-content: flex-start;
  align-items: center; */
}
</style>