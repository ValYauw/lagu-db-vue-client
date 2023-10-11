import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router';

import { NUM_SONGS_PER_PAGE, NUM_ARTISTS_PER_PAGE, NUM_SEARCH_RESULTS_PER_PAGE } from '../config/pagination';

export const useFetchDataStore = defineStore('fetchData', {
  state: () => {
    return { 
      isLoading: false
    }
  },
  getters: { },
  actions: {
    async getGenres() {
      try {
        this.isLoading = true;
        let { data } = await axios.get(
          `${this.$SERVER_URL}/genres`
        );
        return data;
      } catch(err) {
        this.$fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async getSongs(page=1) {
      try {
        this.isLoading = true;
        let query = this.page <= 1 ? '' : `offset=${(page - 1) * NUM_SONGS_PER_PAGE}`;
        let { data } = await axios.get(
          `${this.$SERVER_URL}/songs?limit=${NUM_SONGS_PER_PAGE}&${query}`
        );
        return data;
      } catch(err) {
        this.$fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async getArtists(page=1) {
      try {
        this.isLoading = true;
        let query = this.page <= 1 ? '' : `offset=${(page - 1) * NUM_ARTISTS_PER_PAGE}`;
        let { data } = await axios.get(
          `${this.$SERVER_URL}/artists?limit=${NUM_ARTISTS_PER_PAGE}&${query}`
        );
        return data;
      } catch(err) {
        this.$fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async getGenre(id) {
      try {
        this.isLoading = true;
        let { data } = await axios.get(
          `${this.$SERVER_URL}/genres/${id}`
        );
        return data;
      } catch(err) {
        this.$fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async getSongsByGenre(id, page=1) {
      try {
        this.isLoading = true;
        let query = this.page <= 1 ? '' : `offset=${(page - 1) * NUM_SONGS_PER_PAGE}`;
        let { data } = await axios.get(
          `${this.$SERVER_URL}/genres/${id}/songs?limit=${NUM_SONGS_PER_PAGE}&${query}`
        );
        return data;
      } catch(err) {
        this.$fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async getSong(id) {
      try {
        this.isLoading = true;
        let { data } = await axios.get(
          `${this.$SERVER_URL}/songs/${id}`
        );
        return data;
      } catch(err) {
        this.$fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async getArtist(id) {
      try {
        this.isLoading = true;
        let { data } = await axios.get(
          `${this.$SERVER_URL}/artists/${id}`
        );
        return data;
      } catch(err) {
        this.$fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async getSongsByArtist(id, fetched=0) {
      try {
        this.isLoading = true;
        let query = fetched ? '' : `offset=${fetched}`;
        let { data } = await axios.get(
          `${this.$SERVER_URL}/artists/${id}/songs?limit=${NUM_SONGS_PER_PAGE}&${query}`
        );
        return data;
      } catch(err) {
        this.$fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    // async getAlbumsByArtist(id, fetched=0) {
    //   try {
    //     this.isLoading = true;
    //     let query = fetched ? '' : `?offset=${fetched}`;
    //     let { data } = await axios.get(
    //       `${this.$SERVER_URL}/artists/${id}/albums${query}`
    //     );
    //     return data;
    //   } catch(err) {
    //     this.$fireErrorMessage(err);
    //   } finally {
    //     this.isLoading = false;
    //   }
    // },
    async search(term, entity='song', page=1) {
      try {
        this.isLoading = true;
        let query = this.page <= 1 ? '' : `offset=${(page - 1) * NUM_SEARCH_RESULTS_PER_PAGE}`;
        let url = `${this.$SERVER_URL}/search/${entity}s?title=${term}&limit=${NUM_SEARCH_RESULTS_PER_PAGE}&${query}`;
        let { data } = await axios.get(url);
        return data;
      } catch(err) {
        this.$fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async getRecentYouTubeVideos(channelUrl) {
      try {
        let url = `${this.$SERVER_URL}/youtube/artists`;
        let { data } = await axios.post(url, {
          channelUrl
        });
        return data;
      } catch(err) {
        console.log("Failed to call YouTube API");
        return null;
      }
    },
    async getPopularRatedVocaDBSongs(vocadbUrl) {
      try {
        let url = `${this.$SERVER_URL}/vocadb/artists`;
        let { data } = await axios.post(url, {
          vocadbUrl
        });
        return data;
      } catch(err) {
        console.log("Failed to call VocaDB API");
        return null;
      }
    }
  }
})