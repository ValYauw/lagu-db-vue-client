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
    color="deep-orange-darken-1"
  >

    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>
      <RouterLink to="/" class="navlink">
        LaguDB
      </RouterLink>
    </v-app-bar-title>

    <v-btn>
      <v-icon icon="mdi-playlist-music-outline"></v-icon>
      Browse
      <v-menu activator="parent">
        <v-list>
          <v-list-item
            v-for="(item, index) in ['Songs', 'Artists']"
            :key="index"
          >
            <v-list-item-title>
              <RouterLink :to="`/${item.toLowerCase()}`" class="navlink">
                {{ item }}
              </RouterLink>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>      
    </v-btn>

    <v-btn>
      <v-icon icon="mdi-magnify"></v-icon>
      <RouterLink to="/search" class="navlink">
        Search
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