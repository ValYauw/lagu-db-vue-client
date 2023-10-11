<script>
export default {
  name: 'ArtistExternalLinks',
  props: {
    links: Array
  }
}
</script>

<template>

<v-list lines="one" class="bg-blue-grey-lighten-5 elevation-3">
  <v-list-item
    v-for="(link, index) in links"
    :key="index"
  >
    <a :href="link.webURL" target="_blank">{{ link.description }}</a>
  </v-list-item>
</v-list>

</template>