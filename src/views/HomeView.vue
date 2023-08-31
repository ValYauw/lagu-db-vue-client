<script>
export default {
  name: 'HomeView'
}
</script>

<template>

<v-img class="container"
  src="brand-header.jpg"
  cover
>
  <div class="brand">
    <div class="text-h1">
      <span class="brand-header">
        Welcome to LaguDB
      </span>
    </div>

    <div class="brand-header text-h5">
      <span class="brand-header">
        LaguDB is a music platform-slash-aggregator for music lovers.
      </span>
    </div>

    <span class="brand-header">(for demonstration purposes only)</span>

    <v-btn color="green" size="large" id="start-button">
      <RouterLink to="/songs" class="navlink">
        <span class="brand-stripped">Start Browsing</span>
      </RouterLink>
    </v-btn>

  </div>
</v-img>

</template>

<style scoped>
.container {
  width: 100%;
  height: max-content;
  min-height: 200px;
  min-width: 200px;
  max-width: 100vw;
}
.brand {
  background-color: rgba(240, 248, 255, 0);
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin:auto;
  padding: auto;
}
#start-button {
  margin-top: 30px;
}
</style>