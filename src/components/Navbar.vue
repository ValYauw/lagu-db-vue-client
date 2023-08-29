<script>
import { mapState, mapActions } from 'pinia';
import { useSessionStore } from '@/stores/session';
import { RouterLink } from 'vue-router';

export default {
  name: 'Navbar',
  computed: {
    ...mapState(useSessionStore, ['isLoggedIn'])
  },
  methods: {
    ...mapActions(useSessionStore, ['logout'])
  }
}
</script>

<template>

  <v-app-bar
    color="teal-darken-4"
  >

    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>LaguDB</v-app-bar-title>

    <v-btn>
      <v-icon icon="mdi-playlist-music-outline"></v-icon>
      <RouterLink to="/songs" class="navlink">
        Browse
      </RouterLink>
    </v-btn>

    <v-btn v-if="!isLoggedIn">
      <v-icon icon="mdi-login"></v-icon>
      <RouterLink to="/login" class="navlink">
        Login
      </RouterLink>
    </v-btn>

    <v-btn v-if="!isLoggedIn">
      <RouterLink to="/register" class="navlink">
        Register
      </RouterLink>
    </v-btn>

    <v-btn v-if="isLoggedIn" @click="logout">
      <v-icon icon="mdi-logout"></v-icon>
      Logout
    </v-btn>

  </v-app-bar>

</template>

<style scoped>
  .navlink:link {
    opacity: 1;
  }
</style>