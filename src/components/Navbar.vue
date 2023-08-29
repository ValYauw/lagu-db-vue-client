<script>
import { mapState, mapActions } from 'pinia';
import { useSessionStore } from '@/stores/session';

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
      Browse
    </v-btn>

    <v-btn v-if="!isLoggedIn">
      Login
    </v-btn>

    <v-btn v-if="!isLoggedIn">
      Register
    </v-btn>

    <v-btn v-if="isLoggedIn" @click="logout">
      Logout
    </v-btn>

  </v-app-bar>

</template>