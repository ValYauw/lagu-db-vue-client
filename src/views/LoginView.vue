<script>
import FormLogin from '../components/Login/FormLogin.vue';
export default {
  name: 'LoginView',
  components: {
    FormLogin
  }
}
</script>

<template>

<Navbar />

<v-sheet class="bg-deep-purple pa-12" height="100%">
  
  <h1 class="brand">Login to LaguDB</h1>

  <v-card class="mx-auto px-6 py-8" max-width="500px">
    <FormLogin />
  </v-card>
</v-sheet>

</template>