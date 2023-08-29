<script>
import ArtistLink from './ArtistLink.vue';
import PlayLink from './PlayLink.vue';

export default {
  name: 'SongCard',
  props: {
    id: Number,
    name: String,
    aliases: [Array, null],
    releaseDate: String,
    songType: String,
    Artists: Array,
    PlayLinks: Array
  },
  components: {
    ArtistLink,
    PlayLink
  },
  computed: {
    renderedDate() {
      return new Intl.DateTimeFormat('en-US', { 
        dateStyle: 'long' 
      }).format(new Date(this.releaseDate))
    },
    renderedAliases() {
      return this.aliases ? this.aliases?.map(alias => {
        return `<span class="alias">${alias}</span>`
      }).join(', ') : null;
    }
  }
}
</script>

<template>

<v-card class="mx-auto">

  <div class="song-card">

    <div class="playlinks">
      <PlayLink 
        v-for="playLink in PlayLinks"
        v-bind="playLink"
      />
    </div>

    <div class="title">

      <v-card-title class="text-h5">
        <RouterLink :to="`/songs/${id}`">
          {{ name }}
        </RouterLink>
      </v-card-title>

      <v-card-subtitle>
        <p v-if="aliases">
          Also known as:
          <span v-html="renderedAliases"></span>
        </p>
      </v-card-subtitle>

    </div>

    <div class="info">
      <p>
        <v-chip-group>
          <ArtistLink 
            v-for="artist in Artists" 
            v-bind="artist" 
          />
        </v-chip-group>
      </p>
      <p>
        <v-card-subtitle>
          Released {{ renderedDate }}
        </v-card-subtitle>
      </p>
    </div>
    
  </div>

</v-card>

</template>