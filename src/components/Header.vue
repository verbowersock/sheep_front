<template>
  <div class="wrapper">
    <div class="app_title">
      <h1>{{ title }}</h1>
    </div>
    <div class="input_container">
      <input
        type="text"
        :placeholder="getSelected()"
        v-model="this.query"
        @input="getSearchQuery($event.target.value)"
      />
      <q-btn-dropdown
        color="secondary"
        class="button_dropdown"
        rounded
        dropdown-icon="expand_more"
      >
        <q-list class="list">
          <q-item
            clickable
            v-close-popup
            class="list_item"
            v-for="selection in selections"
            :key="selection.id"
            @click="setSelected(selection.id)"
          >
            {{ selection.label }}
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>

    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: {
      type: String,
      required: true,
    },
    getSearchQuery: Function,
  },
  data() {
    return {
      selections: [
        { id: 1, label: "tag", selected: true },
        { id: 2, label: "name", selected: false },
        { id: 3, label: "breed", selected: false },
        { id: 4, label: "sex", selected: false },
      ],
      tagSelected: "tag",
      query: "",
    };
  },
  methods: {
    sendSearchQuery(val) {
      this.query = val;
      this.$emit("input", this.query);
    },
    getSelected() {
      const tagSelected = this.selections.filter((el) => {
        return el.selected === true;
      });
      //  console.log(tagSelected[0].label);
      this.tagSelected = tagSelected[0].label;
      this.setSearchTag();
      return `Search by ${this.tagSelected}`;
    },
    setSearchTag() {
      // console.log(this.tagSelected);

      this.$emit("setSearchTag", this.tagSelected);
    },
    setSelected(itemId) {
      this.selections = this.selections.map((el) =>
        el.id === itemId
          ? { ...el, selected: true }
          : { ...el, selected: false }
      );
      this.query = "";
      this.getSelected();
    },
  },
};
</script>

<style scoped lang="scss">
.input_container {
  display: block;
  width: 400px;
  position: relative;
}
input {
  width: 100%;
  height: 48px;
  border-radius: 24px;
  padding: 10px 20px;
  border: 1px solid white;
}

h3 {
  font-size: 1.2rem;
}
.button_dropdown {
  width: 48px;
  height: 48px;
  position: absolute;
  right: 0;
}
.list {
  width: 130px;
  height: auto;
  margin: 0;
}
.list_item {
  font-size: 1.3rem;
  width: 100%;
}

.list_item:hover {
  background-color: #68c25a;
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
</style>
