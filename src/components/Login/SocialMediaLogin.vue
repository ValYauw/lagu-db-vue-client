<script>
import { mapActions } from 'pinia';
import { useSessionStore } from '@/stores/session';

export default {
  name: 'SocialMediaLogin',
  methods: {
    ...mapActions(useSessionStore, ['glogin'])
  }
}
</script>

<template>

<div id="glogin">
  <GoogleLogin :callback="glogin"/>
</div>

</template>

<style scoped>
#glogin {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}
</style>