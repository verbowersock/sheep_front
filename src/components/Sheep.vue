<template>
  <va-card
    class="card_background"
    :class="`card_background_${color}`"
    :bordered="false"
  >
    <div class="button-group">
      <q-btn
        flat
        round
        color="secondary"
        icon="edit"
        size="lg"
        @click="handleEdit()"
      />
      <q-btn
        flat
        round
        color="accent"
        icon="delete"
        size="lg"
        @click="handleDelete"
      />
    </div>
    <va-card-title class="card_title"
      >{{ sheep.name ? sheep.name : sheep.tag_id }}
    </va-card-title>
    <va-card-content>
      <div class="card_content_wrapper">
        <div class="card_content_image">
          <img
            v-bind:src="sheep.picture ? sheep.picture : placeholder"
            alt="sheep"
          />
        </div>
        <div class="card_content_text">
          <p>
            <span class="card_content_subtitle">Tag ID:</span>
            {{ sheep.tag_id }}
          </p>
          <p>
            <span class="card_content_subtitle">Scrapie Tag ID:</span>
            <span v-if="sheep.scrapie_id">{{ sheep.scrapie_id }}</span>
            <span v-else> N/A</span>
          </p>
          <p>
            <span class="card_content_subtitle">Date Of Birth:</span>
            {{ sheep.dob }}
          </p>
          <p><span class="card_content_subtitle">Sex:</span> {{ sheep.sex }}</p>
          <p v-if="sheep.purchase_date">
            <span class="card_content_subtitle">Date of Purchase:</span>
            {{ sheep.purchase_date }}
          </p>
          <p v-if="sheep.date_deceased">
            <span class="card_content_subtitle">Date Deceased:</span>
            {{ sheep.date_deceased }}
          </p>
          <p v-else>
            <span class="card_content_subtitle">Age:</span>
            {{ age }}
          </p>

          <p>
            <span class="card_content_subtitle">Breed:</span>
            {{ sheep.breed.breed_name }}
          </p>
          <p>
            <span class="card_content_subtitle">Father:</span>
            <span v-if="sheep.father">{{ sheep.father?.name }}</span>
            <span v-else> N/A</span>
          </p>
          <p>
            <span class="card_content_subtitle">Mother:</span>
            <span v-if="sheep.mother">{{ sheep.mother?.name }}</span>
            <span v-else> N/A</span>
          </p>
          <p>
            <span class="card_content_subtitle">Color:</span>
            <span v-if="sheep.color">{{ sheep.color?.color_name }}</span>
            <span v-else> N/A</span>
          </p>
          <p>
            <span class="card_content_subtitle">Marking:</span>
            <span v-if="sheep.marking">{{ sheep.marking?.marking_name }}</span>
            <span v-else> N/A</span>
          </p>
        </div>
      </div>
    </va-card-content>
  </va-card>
</template>

<script>
import { intervalToDuration, formatDuration } from "date-fns";
import { DELETE_SHEEP } from "../graphql/Queries";
import { GRAPHQL_API_URL } from "../config";
import { print } from "graphql";
import placeholder from "../assets/placeholder.jpg";

export default {
  name: "Sheep",
  props: {
    sheep: Object,
    deleteSheep: Function,
  },
  data: function () {
    return {
      placeholder,
    };
  },
  computed: {
    color() {
      if (this.sheep.date_deceased) {
        return "deceased";
      } else if (this.sheep.sex === "f") {
        return "female";
      } else if (this.sheep.sex === "m") {
        return "male";
      } else {
        return "wether";
      }
    },
    age() {
      const today = new Date();
      if (this.sheep.dob) {
        const dob = Date.parse(this.sheep.dob);
        let units = ["years", "months"];
        let duration = intervalToDuration({ start: dob, end: today });
        console.log(duration);
        if (duration.months === 0) {
          units.push("weeks");
          this.addWeeks(duration);
          if (duration.weeks === 0) {
            units.push("days");
          }
        }

        return formatDuration(duration, {
          format: units,
          delimiter: ", ",
        });
      } else {
        return "N/A";
      }
    },
  },
  methods: {
    addWeeks(duration) {
      if (!duration.weeks) {
        duration.weeks = (duration.days / 7) | 0;
        duration.days = duration.days - duration.weeks * 7;
      }
    },
    handleDelete() {
      this.$q
        .dialog({
          title: "Please Confirm",
          message: `Are you sure you want to delete this sheep?`,
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.axios
            .post(GRAPHQL_API_URL, {
              query: print(DELETE_SHEEP),
              variables: { sheepId: this.sheep.sheep_id },
            })
            .then((res) => {
              if (res.data.data.deleteSheep === "true") {
                this.$emit("deleteSheep", this.sheep.sheep_id);
              } else {
                this.$q.dialog({
                  title: "Can't delete",
                  message: `Something went wrong!`,
                  persistent: true,
                });
              }
            });
        });
    },
    handleEdit() {
      let sheep = Object.fromEntries(Object.entries(this.sheep));

      this.$emit("editForm", sheep);
    },
  },
  //data() {
  //  console.log(this.sheep);

  // console.log(this.sheep);
  // ...this.sheep
  //   console.log(upd_sheep);
  //  const pd = this.sheep.purchase_date ? this.sheep.purchase_date : "N/A";
  //    return { upd_sheep };
  // },
};
</script>

<style scoped>
.card_content_wrapper {
  display: flex;
  flex-direction: row;
  min-height: 300px;
}
.button-group {
  width: 150px;
  position: absolute;
  right: 0;
  top: 10px;
}
.card_background_female {
  background: linear-gradient(
      to top left,
      rgba(255, 255, 255, 0) 50%,
      #c25a68 50.1%
    )
    top left/40px 40px no-repeat !important;
}

.card_background_male {
  background: linear-gradient(
      to top left,
      rgba(255, 255, 255, 0) 50%,
      #5a76c2 50.1%
    )
    top left/40px 40px no-repeat !important;
}
.card_background_deceased {
  background: linear-gradient(
      to top left,
      rgba(255, 255, 255, 0) 50%,
      #000 50.1%
    )
    top left/40px 40px no-repeat !important;
}

.card_background_wether {
  background: linear-gradient(
      to top left,
      rgba(255, 255, 255, 0) 50%,
      #68c25a 50.1%
    )
    top left/40px 40px no-repeat !important;
}
.card_title {
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
}

.card_content_text {
  padding-left: 25px;
  font-size: 1.5rem;
}

.card_content_subtitle {
  font-weight: bold;
  font-size: 1.4rem;
  margin-right: 10px;
}

img {
  height: 100%;
}
.card_content_image {
  width: 200px;
  height: 200px;
  overflow: hidden;
  object-fit: cover;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  color: white;
}
p {
  margin: 0 0 3px;
}

.card_title {
  font-size: 1.3rem;
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
