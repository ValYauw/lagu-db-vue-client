<script>
import { mapActions } from 'pinia';
import { useSessionStore } from '@/stores/session';

export default {
  name: 'FormLogin',
  data() {
    return {
      isLoading: false,
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useSessionStore, ['login']),
    async onSubmit() {
      this.isLoading = true;
      console.log('Logging in...');
      await this.login(this.email, this.password);
      this.isLoading = false; 
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
    :loading="isLoading"
    color="success"
    size="large"
    type="submit"
  >
    Login
  </v-btn>

</v-form>

</template>