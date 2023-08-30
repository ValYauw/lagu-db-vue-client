<script>
import { RouterLink, RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
export default {
  components: {
    Navbar
  }
}
</script>

<template>
  <v-app>
    
    <v-layout>

      <Navbar />

      <v-main>
        <RouterView />
      </v-main>

    </v-layout>
  
  </v-app>
</template>