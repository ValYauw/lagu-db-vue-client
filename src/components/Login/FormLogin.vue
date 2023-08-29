<script>
import { mapActions } from 'pinia';


export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit() {

    }
  }
}
</script>

<template>

<v-form @submit.prevent="onSubmit">

  <v-text-field
    v-model="email"
    placeholder="username@mail.com"
    label="Email"
    type="email"
    required
  ></v-text-field>

  <v-text-field
    v-model="password"
    label="Password"
    type="password"
    required
  ></v-text-field>

  <v-btn
    block
    color="success"
    size="large"
    type="submit"
  >
    Login
  </v-btn>

</v-form>

</template>