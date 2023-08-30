<script>
export default {
  name: 'SearchCard',
  props: { 
    entity: String,
    id: Number,
    name: String,
    alias: String,
    description: [String, null, undefined]
  }
}
</script>

<template>

<v-card class="mx-auto">

  <div class="song-card">

    <div class="title">

      <v-card-title class="text-h5">
        <RouterLink :to="`/${entity?.toLowerCase()}s/${id}`">
          {{ name }}
        </RouterLink>
      </v-card-title>

      <v-card-subtitle v-if="alias">
        <p>
          Also known as: <span class="alias">{{ alias }}</span>
        </p>
      </v-card-subtitle>

    </div>

    <div class="info" v-if="description">
      <v-card-text>
        {{ description }}
      </v-card-text>
    </div>
    
  </div>

</v-card>

</template>