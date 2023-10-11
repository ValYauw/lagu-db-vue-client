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
    artists: Array,
    links: Array
  },
  components: {
    ArtistLink,
    PlayLink
  },
  computed: {
    renderedDate() {
      if (this.releaseDate) {
        return 'Released ' + new Intl.DateTimeFormat('en-US', { 
          dateStyle: 'long' 
        }).format(new Date(this.releaseDate))
      } else {
        return `Unknown release date`
      }
    },
    renderedAliases() {
      return this.aliases ? this.aliases?.map(alias => {
        return `<span class="alias">${alias}</span>`
      }).join(', ') : null;
    }
  },
  created() {
    console.log('Creating', this.id);
  }
}
</script>

<template>

<v-card class="mx-2 my-2">

  <div class="bg-deep-orange-lighten-5 song-card">

    <div class="playlinks">
      <PlayLink 
        v-for="playLink in links"
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
            v-for="artist in artists" 
            v-bind="artist" 
          />
        </v-chip-group>
      </p>
      <p>
        <v-card-subtitle>
          {{ renderedDate }}
        </v-card-subtitle>
      </p>
    </div>
    
  </div>

</v-card>

</template>