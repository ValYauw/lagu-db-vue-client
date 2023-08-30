<script>
export default {
  name: 'YouTubeReport',
  props: {
    channelId: String,
    title: String,
    description: String,
    customUrl: String,
    publishedAt: String,
    imageUrl: String,
    uploads: Array,
    statistics: Object,
  }
}
</script>

<template>

<v-card class="bg-blue-grey-lighten-4 mx-auto elevation-5" max-width="900px">

  <v-card-title>
    Recent YouTube Uploads
  </v-card-title>

  <v-carousel hide-delimiters height="400">

    <v-carousel-item
      v-for="upload in uploads"
    >

      <div class="d-flex fill-height justify-center align-center flex-column">

        <a :href="`https://youtu.be/${upload.videoId}`" target="_blank">
          <v-img 
            :src="upload.imageUrl.url" 
            :width="upload.imageUrl.width" 
            :height="upload.imageUrl.height"
          ></v-img>
        </a>

        <v-card-text>
          <a :href="`https://youtu.be/${upload.videoId}`" target="_blank">
            {{ upload.title }}
          </a>
        </v-card-text>

      </div>

    </v-carousel-item>

  </v-carousel>

</v-card>

</template>