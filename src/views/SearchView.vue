<script>
import { mapState, mapActions } from 'pinia';
import { useFetchDataStore } from '@/stores/fetchData';

import SearchCard from '../components/SearchCard/SearchCard.vue';

export default {
  name: 'SearchView',
  data() {
    return {
      term: '',
      entity: 'Song',
      count: null,
      retrieved: null,
      data: []
    }
  },
  components: {
    SearchCard
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
      this.data = data.data;
      this.retrieved = data.data.length;
      console.log(this.data);
    }
  },
  watch: {
    entity(newValue, oldValue) {
      this.prepareToSearch();
    }
  }
}
</script>

<template>

<v-sheet class="bg-deep-purple pa-12" height="100%">

  <v-toolbar id="toolbar"
    dense
    rounded
  >

    <v-select id="category"
      hide-details
      :items="['Song', 'Artist', 'Album']"
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

  <v-card class="mx-auto" v-if="count !== null">
    <SearchCard 
      v-for="datum in data"
      v-bind="{entity: this.entity, ...datum}"
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