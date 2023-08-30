<script>
import { RouterLink } from 'vue-router';
export default {
  name: 'ArtistLink',
  props: {
    id: Number,
    aliases: [Array, null],
    name: String
  }
}
</script>

<template>

<v-chip 
  variant="elevated" 
  size="small"
  color="primary"
>
  <RouterLink 
    :to="`/artists/${this.id}`"
  >
    {{ name }}
  </RouterLink>
</v-chip>

</template>