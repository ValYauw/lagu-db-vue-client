<script>
export default {
  name: 'ArtistCard',
  props: {
    id: Number,
    name: String,
    aliases: [Array, null],
    imageURL: String,
    description: String,
    numSongs: Number
  },
  components: { },
  computed: {
    renderedAliases() {
      return this.aliases ? this.aliases?.map(alias => {
        return `<span class="alias">${alias}</span>`
      }).join(', ') : null;
    }
  },
}
</script>

<template>

<v-card class="mx-auto">

  <div class="bg-deep-orange-lighten-5 artist-card">

    <v-avatar
      class="ma-3"
      size="125"
      rounded="0"
    >
      <v-img :src="imageURL"></v-img>
    </v-avatar>

    <div>

      <v-card-title class="text-h5">
        <RouterLink :to="`/artists/${id}`">
          {{ name }}
        </RouterLink>
      </v-card-title>

      <v-card-subtitle>
        <p v-if="aliases">
          Also known as:
          <span v-html="renderedAliases"></span>
        </p>
      </v-card-subtitle>

      <v-card-text>
        {{ description }}
      </v-card-text>

      <v-card-subtitle>
        {{ numSongs }} songs registered on the database.
      </v-card-subtitle>

    </div>

  </div>

</v-card>

</template>