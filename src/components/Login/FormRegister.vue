<script>
import { mapActions } from 'pinia';
import { useSessionStore } from '@/stores/session';

export default {
  name: 'FormRegister',
  data() {
    return {
      isLoading: false,
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useSessionStore, ['register']),
    async onSubmit() {
      this.isLoading = true;
      console.log('Registering...');
      await this.register(this.username, this.email, this.password);
      this.isLoading = false; 
    },
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<template>

<v-form @submit.prevent="onSubmit">

  <v-text-field
    v-model="username"
    placeholder="J. Doe"
    label="Username"
    type="text"
    required
  ></v-text-field>

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

  <div class="buttons">

    <v-btn
      color="red"
    >
      Cancel
    </v-btn>

    <v-btn
      :loading="isLoading"
      color="success"
      type="submit"
    >
      Register
    </v-btn>

  </div>

</v-form>

</template>

<style scoped>
.buttons {
  display: flex;
  justify-content: center;
}
.buttons > button {
  width: 40%;
  margin: 3%;
}
</style>