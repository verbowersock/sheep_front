<template>
  <div class="container">
    <!--<div v-if="allSheep.length !== 1" class="container">-->
    <Sheep :sheep="sheep" :key="sheep.id" v-for="sheep in allSheep" />
  </div>
  <!-- <div class="not_found" v-else>Sorry, no sheep found!</div>-->
</template>
<script>
import Sheep from "./Sheep.vue";
export default {
  name: "SheepList",
  components: {
    Sheep,
  },
  props: {
    allSheep: Array,
  },
};
</script>
<style scoped>
.container {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: auto;
  width: 1400px;
  padding-top: 20px;
  margin: 0 auto;
}

h3 {
  font-size: 1.2rem;
}
.not_found {
  padding-top: 150px;
  font-size: 2rem;
  text-align: center;
}
.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
