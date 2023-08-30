<script>
export default {
  name: 'GenreCard',
  props: {
    name: String 
  }
}
</script>

<template>
  
<v-chip 
  variant="elevated" 
  size="small"
  color="green"
>
  {{ name }}
</v-chip>

</template>