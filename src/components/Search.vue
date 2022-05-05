<template>
  <div>
    <input
      type="text"
      :placeholder="getSelected()"
      v-model="this.query"
      @input="getSearchQuery($event.target.value)"
    />
    <va-button-dropdown color="#c2875a" size="large" class="buttonDropdown">
      <va-list class="list">
        <va-list-item
          class="list_item"
          v-for="selection in selections"
          :key="selection.id"
          @click="setSelected(selection.id)"
        >
          {{ selection.label }}
        </va-list-item>
      </va-list>
    </va-button-dropdown>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
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
      console.log(`query is ${this.query}`);
      this.getSelected();
    },
  },
};
</script>

<style scoped>
div {
  width: 400px;
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
.buttonDropdown {
  position: absolute;
  width: 48px;
  top: 0;
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
</style>
