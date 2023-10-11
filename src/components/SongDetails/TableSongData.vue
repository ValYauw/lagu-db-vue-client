<script>
import ArtistLink from '../SongCard/ArtistLink.vue';
import GenreCard from '../SongCard/GenreCard.vue';
import PlayLink from '../SongCard/PlayLink.vue';

export default {
  name: 'TableSongData',
  props: {
    links: Array,
    artists: Array,
    genres: Array
  },
  components: {
    ArtistLink,
    GenreCard,
    PlayLink,
  }
}
</script>

<template>

<v-table class="bg-brown-lighten-4 elevation-5">
  <tbody>
    <tr>
      <td>Play Links:</td>
      <td>
        <div>
          <PlayLink
            v-for="playLink in links" 
            v-bind="playLink" 
          />
        </div>
      </td>
    </tr>
    <tr>
      <td>Artists:</td>
      <td>
        <v-chip-group>
          <ArtistLink 
            v-for="artist in artists" 
            v-bind="artist" 
          />
        </v-chip-group>
      </td>
    </tr>
    <tr>
      <td>Genres:</td>
      <td>
        <v-chip-group>
          <GenreCard 
            v-for="genre in genres" 
            v-bind="genre" 
          />
        </v-chip-group>
      </td>
    </tr>
  </tbody>
</v-table>

</template>