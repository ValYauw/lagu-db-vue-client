<script>
export default {
  name: 'Loader',
  props: {
    isLoading: Boolean
  }
}
</script>

<template>
  <div class="loader">
    <v-progress-circular
      indeterminate
      color="primary"
      :size="70"
      :width="7"
    />
  </div>
</template>