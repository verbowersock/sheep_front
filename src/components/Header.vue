<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="app_title">
    <h1>{{ title }}</h1>
  </div>
</template>

<style scoped>
.app_title {
  display: flex;
}
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  color: white;
}

h3 {
  font-size: 1.2rem;
}
</style>
