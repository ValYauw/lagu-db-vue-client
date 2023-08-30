<script>
export default {
  name: 'YouTubeReport',
  props: {
    data: Array
  }
}
</script>

<template>

<v-card class="bg-blue-grey-lighten-4 mx-auto elevation-5" max-width="900px">

  <v-card-title class="h-auto">
    Top Community-rated VOCALOID Songs
  </v-card-title>

  <v-card-subtitle>
    By <a href="https://vocadb.net">VOCALOID Database</a>
  </v-card-subtitle>

  <v-list lines="one" class="bg-blue-grey-lighten-5 elevation-3">
    <v-list-item
      v-for="({ name, aliases, artistString, ratingScore }, index) in data?.slice(0,3)"
      :key="index"
    >
      <p>{{ name }}</p>
      <p style="font-size: 8pt">{{ aliases }}</p>
    </v-list-item>
  </v-list>

</v-card>

</template>