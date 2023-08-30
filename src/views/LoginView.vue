<script>
import FormLogin from '../components/Login/FormLogin.vue';
import SocialMediaLogin from '../components/Login/SocialMediaLogin.vue';
export default {
  name: 'LoginView',
  components: {
    FormLogin,
    SocialMediaLogin
  }
}
</script>

<template>

<v-sheet class="bg-deep-orange-darken-4 pa-12" height="100%">
  
  <h1 class="brand">Login to LaguDB</h1>

  <v-card class="bg-brown-lighten-5 mx-auto px-6 py-8" max-width="500px">
    <FormLogin />
    <SocialMediaLogin />
  </v-card>

</v-sheet>

</template>