<template>
  <header>
    <div class="wrapper">
      <Header title="MyFlock" />
      <Search :getSearchQuery="getSearchQuery" v-on:setSearchTag="setTag" />

      <va-button size="large" color="#c2875a" class="button_add">
        <va-icon size="large" name="add" /> Add a sheep</va-button
      >

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <p v-if="error">Something went wrong...</p>
  <p v-if="loading">Loading...</p>

  <SheepList :allSheep="searchResults(this.searchTag, this.query)" />
  <div
    class="not_found"
    v-if="searchResults(this.searchTag, this.query).length === 0"
  >
    Sorry! No sheep found.
  </div>

  <!-- <RouterView />
  -->
</template>
<script>
import Header from "@/components/Header.vue";
import SheepList from "@/components/SheepList.vue";
import { ALL_SHEEP } from "@/graphql/Queries.js";
import { useQuery } from "@vue/apollo-composable";
import Search from "@/components/Search.vue";
//import { GetAllSheep } from "./graphql/Queries";

export default {
  name: "App",
  components: {
    Header,
    SheepList,
    Search,
  },
  setup() {
    const { result, loading, error } = useQuery(ALL_SHEEP);
    return {
      result,
      loading,
      error,
    };
  },

  //mounted() {
  //  this.searchResults(this.searchTag, this.query);
  //},

  methods: {
    getSearchQuery(query) {
      this.query = query;
    },
    setTag(key) {
      this.searchTag = key === "tag" ? (this.key = "tag_id") : (this.key = key);
      this.query = "";
    },
    searchResults(key, value) {
      value = value.toLowerCase();
      const res =
        key === "breed"
          ? this.result?.get_all_sheep.filter((el) =>
              el.breed.breed_name.includes(value)
            )
          : this.result?.get_all_sheep.filter((el) =>
              el[key].toLowerCase().includes(value)
            );
      console.log(value);
      this.allSheep = res;
      return res;
    },
  },
  data() {
    return {
      query: "",
      searchTag: "tag_id",
      allSheep: this.result,
    };
  },
};
</script>

<style>
@import "@/assets/base.css";

header {
  line-height: 1.5;
  max-height: 100vh;
  width: 100%;
  justify-items: center;
  background-color: #68c25a;
  display: flex;
  justify-content: center;
}

#app {
  width: 100%;
  font-weight: normal;
}
.wrapper {
  width: 100%;
  max-width: 1280px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  margin: 0 auto;
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
