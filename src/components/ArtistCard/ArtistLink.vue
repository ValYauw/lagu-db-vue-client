<script>
export default {
  name: 'ArtistLink',
  props: {
    id: Number,
    webURL: String,
    description: String,
    isInactive: Boolean,
    ArtistId: Number
  }
}
</script>

<template>
  <a :href="webURL" target="_blank">{{ description }}</a>
</template>