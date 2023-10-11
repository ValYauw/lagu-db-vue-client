<script>
export default {
  name: 'GenreCard',
  props: {
    id: Number,
    name: String,
    subGenres: Array
  }
}
</script>

<template>
  <v-card
    class="mx-auto my-2"
    variant="outlined"
  >
    <v-card-item>
      <div>
        <div class="text-h6 mb-1">
          <RouterLink :to="`/genres/${id}`">
            {{ name }}
          </RouterLink>
        </div>
        <div class="text-caption">
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
        </div>
      </div>
    </v-card-item>

  </v-card>
</template>