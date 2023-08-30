<script>
export default {
  name: 'ArtistExternalLinks',
  props: {
    ArtistLinks: Array
  }
}
</script>

<template>

<v-list lines="one" class="elevation-3">
  <v-list-item
    v-for="(link, index) in ArtistLinks"
    :key="index"
  >
    <a :href="link.webURL" target="_blank">{{ link.description }}</a>
  </v-list-item>
</v-list>

</template>