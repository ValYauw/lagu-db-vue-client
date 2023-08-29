<script>
export default {
  name: 'Navbar'
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

    <v-btn>
      Login
    </v-btn>

    <v-btn>
      Register
    </v-btn>

  </v-app-bar>

</template>