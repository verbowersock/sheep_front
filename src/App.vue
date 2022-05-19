<template>
  <header>
    <Header
      title="MyFlock"
      :getSearchQuery="getSearchQuery"
      v-on:setSearchTag="setTag"
    ></Header>
  </header>

  <!-- <p v-if="error">Something went wrong...</p>
  <p v-if="loading">Loading...</p>-->
  <q-dialog v-model="formOpen">
    <AddForm v-on:update_data="updateData" @onClose="handleOpenForm" />
  </q-dialog>
  <!--<SheepList :sheeps="searchResults(this.searchTag, this.query)" />-->

  <SheepList :sheeps="allSheep" v-on:deleteSheep="deleteSheep" />

  <!--<div
    class="not_found"
    v-if="searchResults(this.searchTag, this.query).length === 0"
  >
    Sorry! No sheep found.
  </div>-->

  <q-btn
    fab
    color="secondary"
    class="fixed-bottom-right button_add"
    @click="handleOpenForm"
  >
    <q-icon left size="2.5em" name="add" />
    <div class="add_button_text">Add a sheep</div>
  </q-btn>

  <!-- <RouterView />
  -->
</template>
<script>
import Header from "@/components/Header.vue";
import { ref, computed } from "vue";
import SheepList from "@/components/SheepList.vue";
import { ALL_SHEEP } from "@/graphql/Queries.js";

import AddForm from "@/components/AddForm.vue";
import { GRAPHQL_API_URL } from "./config";
import { inject } from "vue";
import { print } from "graphql";

//import { GetAllSheep } from "./graphql/Queries";

export default {
  name: "App",
  components: {
    Header,
    SheepList,
    AddForm,
  },

  setup() {
    const allSheep = ref([]);
    const formOpen = ref(true);
    const searchQuery = ref("");
    const searchTag = ref("tag_id");
    const axios = inject("axios");
    axios
      .post(GRAPHQL_API_URL, {
        query: print(ALL_SHEEP),
      })
      .then((response) => {
        allSheep.value = response.data.data.get_all_sheep;
      })
      .catch((err) => console.log(err));

    const filteredSheep = computed(function () {
      const query = searchQuery.value.toLowerCase();
      return searchTag.value === "breed"
        ? allSheep.value.filter((el) => el.breed.breed_name.includes(query))
        : allSheep.value.filter((el) =>
            el[searchTag.value].toLowerCase().includes(query)
          );
    });

    function getSearchQuery(query) {
      searchQuery.value = query;
    }

    function setTag(key) {
      searchTag.value = key === "tag" ? (key = "tag_id") : key;
      searchQuery.value = "";
    }

    function handleOpenForm() {
      formOpen.value = !formOpen.value;
    }
    function updateData(data) {
      allSheep.value = [...allSheep.value, data];
    }

    function deleteSheep(id) {
      allSheep.value = allSheep.value.filter((el) => el.sheep_id !== id);
    }

    return {
      allSheep: filteredSheep,
      getSearchQuery,
      setTag,
      handleOpenForm,
      updateData,
      formOpen,
      searchQuery,
      searchTag,
      deleteSheep,
    };
  },
};
</script>

<style lang="scss">
header {
  line-height: 1.5;
  max-height: 100vh;
  width: 100%;
  justify-items: center;
  background-color: $primary;
  display: flex;
  justify-content: center;
}

#app {
  width: 100%;
  font-weight: normal;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a {
  text-decoration: none;
  transition: 0.4s;
  color: var(--color-text);
}

.add_button_text {
  font-size: 1.3rem;
  padding-left: 5px;
}

.button_add {
  margin: 20px;
}

.not_found {
  padding-top: 150px;
  font-size: 2rem;
  text-align: center;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 200px;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text-light);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {
    display: flex;
  }

  #app {
  }

  header {
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: right;
    font-size: 1rem;
  }
}
</style>
