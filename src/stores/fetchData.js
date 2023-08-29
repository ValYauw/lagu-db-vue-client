import { defineStore } from 'pinia';
import axios from 'axios';
import parser from 'subtitles-parser-vtt';
import router from '@/router';

export const useFetchDataStore = defineStore('fetchData', {
  state: () => {
    return {
      isLoading: false,

      songs: [],
      songsCount: null,
      songsRetrieved: 0,

      artists: [],
      artistsCount: null,
      artistsRetrieved: 0,
    }
  },
  getters: { },
  actions: {
    async getSongs(refresh=false) {
      try {
        if (refresh) this.songsCount = null;
        this.isLoading = true;
        let query = this.songsCount === null ? '' : `?offset=${this.songsRetrieved}`;
        let { data } = await axios.get(
          `${this.$SERVER_URL}/songs${query}`
        );
        this.songsCount = data.count;
        if (this.songsCount === null) {
          this.songs = data.data;
          this.songsRetrieved = data.data.length;
        } else {
          this.songs.push(...data.data);
          this.songsRetrieved += data.data.length;
        }
      } catch(err) {
        this.$fireErrorMessage(err);
      } finally {
        this.isLoading = false;
      }
    },
    async getArtists(refresh=false) {
      try {
        if (refresh) this.artistsCount = null;
        this.isLoading = true;
        let query = this.artistsCount === null ? '' : `?offset=${this.artistsRetrieved}`;
        let { data } = await axios.get(
          `${this.$SERVER_URL}/artists${query}`
        );
        this.artistsCount = data.count;
        if (this.artistsCount === null) {
          this.artists = data.data;
          this.artistsRetrieved = data.data.length;
        } else {
          this.artists.push(...data.data);
          this.artistsRetrieved += data.data.length;
        }
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
        data.TimedLyrics = data.TimedLyrics.map(el => {
          const obj = parser.fromVtt(el.timedLyrics, 'ms');
          return obj;
        });
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
    }
  }
})