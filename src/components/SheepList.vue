<template>
  <div class="container">
    <!--<div v-if="allSheep.length !== 1" class="container">-->
    <Sheep
      :sheep="sheep"
      :key="sheep.id"
      @editForm="editForm(sheep)"
      v-for="sheep in sheeps"
      @deleteSheep="deleteSheep"
    />
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
    sheeps: Array,
  },

  methods: {
    deleteSheep(id) {
      this.$emit("deleteSheep", id);
    },
    editForm(sheep) {
      console.log(sheep);
      this.$emit("editForm", sheep);
    },
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
  margin: 0 auto 50px;
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
