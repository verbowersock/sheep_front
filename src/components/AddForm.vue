<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{ formTitle }} a Sheep</div>
    </q-card-section>
    <q-separator />

    <q-card-section style="max-height: 50vh" class="scroll">
      <q-form ref="form" @submit="onSubmit" @cancel="onCancel">
        <div v-if="picture_exists" class="pic-preview_container">
          <div class="icon_container">
            <q-icon
              name="cancel"
              color="grey"
              size="22px"
              @click.stop.prevent="picture_exists = false"
              class="cursor-pointer"
            />
          </div>
          <div class="pic-preview">
            <img v-bind:src="sheep.picture" />
          </div>
        </div>
        <q-file
          bottom-slots
          name=""
          label="Sheep photo"
          v-model="input.picture"
          counter
          stack-label
          accept=".jpg, image/*"
          @rejected="onRejected"
        >
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop />
          </template>
          <template v-if="input.picture" v-slot:append>
            <q-icon
              name="cancel"
              @click.stop.prevent="input.picture = null"
              class="cursor-pointer"
            />
          </template>
        </q-file>
        <q-input
          stack-label
          class="input"
          name="name"
          v-model="input.name"
          label="Name"
        />

        <q-input
          stack-label
          class="input"
          name="tag_id"
          v-model="input.tag_id"
          label="Tag ID *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please enter Tag ID']"
        />
        <q-input
          stack-label
          class="input"
          name="scrapie_id"
          v-model="input.scrapie_id"
          label="Scrapie Tag ID"
        />
        <q-select
          stack-label
          class="input"
          name="sex"
          clearable
          v-model="input.sex"
          :options="sexOptions"
          option-value="name"
          option-label="name"
          label="Sheep sex *"
          :rules="[(val) => val || 'Please select Sex']"
        />

        <q-input
          class="input"
          name="dob"
          v-model="input.dob"
          type="date"
          label="Date of birth"
          stack-label
        >
        </q-input>

        <q-input
          class="input"
          name="purchase_date"
          v-model="input.dop"
          type="date"
          stack-label
          label="Date of purchase"
        />
        <q-select
          stack-label
          class="input"
          name="breed"
          v-model="input.breed"
          :options="optionsFiltered(breedOptions, 'breed_name')"
          use-input
          input-debounce="0"
          clearable
          new-value-mode="add-unique"
          @filter="filterFn"
          @new-value="createBreed"
          option-value="id"
          option-label="breed_name"
          label="Breed *"
          transition-show="scale"
          transition-hide="scale"
          lazy-rules
          :rules="[(val) => val || 'Please select Breed']"
        >
          <template v-slot:option="{ itemProps, opt }">
            <q-item v-bind="itemProps">
              <q-item-section>
                <q-item-label v-html="opt.breed_name" />
              </q-item-section>
              <q-item-section side>
                <q-icon
                  name="delete"
                  color="primary"
                  size="22px"
                  @click.stop="handleDeleteBreed(opt.id)"
                />
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-select
          stack-label
          class="input"
          name="dam"
          clearable
          v-model="input.mother"
          :options="damOptions"
          option-value="id"
          option-label="name"
          label="Mother"
        />
        <q-select
          stack-label
          class="input"
          name="sire"
          clearable
          v-model="input.father"
          :options="sireOptions"
          option-value="id"
          option-label="name"
          label="Father"
        />

        <q-select
          stack-label
          class="input"
          name="color"
          v-model="input.color"
          :options="optionsFiltered(colorOptions, 'color_name')"
          use-input
          input-debounce="0"
          clearable
          new-value-mode="add-unique"
          @filter="filterFn"
          @new-value="createColor"
          option-value="id"
          option-label="color_name"
          label="Color"
          transition-show="scale"
          transition-hide="scale"
        >
          <template v-slot:option="{ itemProps, opt }">
            <q-item v-bind="itemProps">
              <q-item-section>
                <q-item-label v-html="opt.color_name" />
              </q-item-section>
              <q-item-section side>
                <q-icon
                  name="delete"
                  color="primary"
                  size="22px"
                  @click.stop="handleDeleteColor(opt.id)"
                />
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          stack-label
          class="input"
          name="marking"
          v-model="input.marking"
          :options="optionsFiltered(markingOptions, 'marking_name')"
          use-input
          input-debounce="0"
          clearable
          new-value-mode="add-unique"
          @filter="filterFn"
          @new-value="createMarking"
          option-value="id"
          option-label="marking_name"
          label="Marking"
          transition-show="scale"
          transition-hide="scale"
        >
          <template v-slot:option="{ itemProps, opt }">
            <q-item v-bind="itemProps">
              <q-item-section>
                <q-item-label v-html="opt.marking_name" />
              </q-item-section>
              <q-item-section side>
                <q-icon
                  name="delete"
                  color="primary"
                  size="22px"
                  @click.stop="handleDeleteMarking(opt.id)"
                />
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-checkbox
          left-label
          v-model="markDeceased"
          label="Mark as deceased"
        />
        <q-input
          v-if="markDeceased"
          class="input"
          name="date_deceased"
          v-model="input.date_deceased"
          type="date"
          label="Date deceased"
          stack-label
          @change="onDeadChange($event)"
        >
        </q-input>
        <q-separator />

        <div>
          <q-btn flat label="Cancel" color="secondary" v-close-popup />
          <q-btn @click="onSubmit" flat label="Submit" color="primary" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { print } from "graphql";
import { ALL_BREEDS } from "../graphql/Queries";
import { CREATE_BREED } from "../graphql/Queries";
import { DELETE_BREED } from "../graphql/Queries";
import { CREATE_COLOR } from "../graphql/Queries";
import { DELETE_COLOR } from "../graphql/Queries";
import { CREATE_MARKING } from "../graphql/Queries";
import { DELETE_MARKING } from "../graphql/Queries";
import { ALL_FEMALES } from "../graphql/Queries";
import { ALL_MALES } from "../graphql/Queries";
import { ALL_COLORS } from "../graphql/Queries";
import { ALL_MARKINGS } from "../graphql/Queries";
import { CREATE_SHEEP } from "../graphql/Queries";
import { UPDATE_SHEEP } from "../graphql/Queries";
import { GRAPHQL_API_URL } from "../config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FirebaseStorage } from "../services/firebase";
//import { getStorage, ref, getDownloadURL } from "firebase/storage";

//import { singleUpload, deleteObjectByKey } from "../../aws.js";

//import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
  name: "AddForm",
  props: {
    formTitle: String,
    sheep: Object,
  },

  beforeCreate() {
    // console.log(this.sheep.marking);
    console.log(this.sheep);
    this.axios
      .post(GRAPHQL_API_URL, {
        query: print(ALL_BREEDS),
      })
      .then((response) => {
        this.breedOptions = response.data.data.get_all_breeds;
      })
      .catch((err) => console.log(err));
    this.axios
      .post(GRAPHQL_API_URL, {
        query: print(ALL_FEMALES),
      })
      .then((response) => {
        this.damOptions = response.data.data.get_all_females;
      })
      .catch((err) => console.log(err));

    this.axios
      .post(GRAPHQL_API_URL, {
        query: print(ALL_MALES),
      })
      .then((response) => {
        this.sireOptions = response.data.data.get_all_males;
      })
      .catch((err) => console.log(err));

    this.axios
      .post(GRAPHQL_API_URL, {
        query: print(ALL_COLORS),
      })
      .then((response) => {
        this.colorOptions = response.data.data.get_all_colors;
      })
      .catch((err) => console.log(err));

    this.axios
      .post(GRAPHQL_API_URL, {
        query: print(ALL_MARKINGS),
      })
      .then((response) => {
        this.markingOptions = response.data.data.get_all_markings;
      })
      .catch((err) => console.log(err));
  },

  created() {
    if (this.input.sex) {
      const x = this.sexOptions.find((o) => o.id === this.input.sex);
      this.input.sex = { id: x.id, name: x.name };
    }
  },
  unmounted() {
    this.breedOptions = [];
  },

  data() {
    return {
      input: {
        name: this.sheep.name,
        tag_id: this.sheep.tag_id,
        scrapie_id: this.sheep.scrapie_id,
        sex: this.sheep.sex,
        dob: this.sheep.dob,
        dop: this.sheep.dop,
        breed: this.sheep.breed,
        mother: this.sheep.mother,
        father: this.sheep.father,
        color: this.sheep.color,
        marking: this.sheep.marking,
        picture: null,
        sheep_id: this.sheep.sheep_id,
        date_deceased: this.sheep.date_deceased,
      },
      picture_exists: this.sheep.picture !== null,
      markDeceased: false,
      nameref: null,
      breedOptions: [],
      damOptions: [],
      sireOptions: [],
      colorOptions: [],
      markingOptions: [],
      sexOptions: [
        { id: "f", name: "female" },
        { id: "m", name: "male" },
        { id: "w", name: "wether" },
      ],
      showDialog: false,
      newVal: "",
      location: "",
      action: "",
      searchVal: "",
      cancelled: true,
    };
  },

  computed: {
    optionsFiltered() {
      return (options, prop) => {
        const needle = this.searchVal.toLocaleLowerCase();
        const fn =
          prop === void 0
            ? (opt) => opt.toLocaleLowerCase().indexOf(needle) > -1
            : (opt) => opt[prop].toLowerCase().indexOf(needle) > -1;

        return needle.length === 0 ? options : options.filter(fn);
      };
    },
    optionsBreed() {
      return this.breedOptions;
    },
  },
  methods: {
    onDeadChange(e) {
      console.log(e);
    },
    createBreed(val, done) {
      if (val.length > 0) {
        if (!this.breedOptions.some((e) => e.breed_name === val)) {
          this.$q
            .dialog({
              title: "Please Confirm",
              message: `Are you sure you want to add ${val} to your breeds?`,
              cancel: true,
              persistent: true,
            })
            .onOk(() => {
              this.axios
                .post(GRAPHQL_API_URL, {
                  query: print(CREATE_BREED),
                  variables: { breedName: val },
                })
                .then((res) => {
                  console.log(res.data.data.createBreed);
                  this.breedOptions = [
                    ...this.breedOptions,
                    res.data.data.createBreed,
                  ];
                  this.input.breed = res.data.data.createBreed;
                  console.log(this.breedOptions);
                })
                .catch((err) => console.log(err));

              done(val, "add-unique");
            });
        }
      }
    },
    createColor(val, done) {
      if (val.length > 0) {
        if (!this.colorOptions.some((e) => e.color_name === val)) {
          this.$q
            .dialog({
              title: "Please Confirm",
              message: `Are you sure you want to add ${val} to your colors?`,
              cancel: true,
              persistent: true,
            })
            .onOk(() => {
              this.axios
                .post(GRAPHQL_API_URL, {
                  query: print(CREATE_COLOR),
                  variables: { colorName: val },
                })
                .then((res) => {
                  console.log(res);
                  this.colorOptions = [
                    ...this.colorOptions,
                    res.data.data.createColor,
                  ];
                  this.input.color = res.data.data.createColor;
                })
                .catch((err) => console.log(err));

              done(val, "add-unique");
            });
        }
      }
    },
    handleDeleteColor(id) {
      this.$q
        .dialog({
          title: "Please Confirm",
          message: `Are you sure you want to delete this color from your colors?`,
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.axios
            .post(GRAPHQL_API_URL, {
              query: print(DELETE_COLOR),
              variables: { deleteColorId: id },
            })
            .then((res) => {
              if (res.data.data.deleteColor === "true") {
                this.colorOptions = this.colorOptions.filter(
                  (el) => el.id !== id
                );
                this.input.color = "";
              } else {
                this.$q.dialog({
                  title: "Can't delete",
                  message: `Can't delete this color. It is connected to one or more sheep`,
                  persistent: true,
                });
              }
            });
        });
    },
    createMarking(val, done) {
      if (val.length > 0) {
        if (!this.markingOptions.some((e) => e.marking_name === val)) {
          this.$q
            .dialog({
              title: "Please Confirm",
              message: `Are you sure you want to add ${val} to your markings?`,
              cancel: true,
              persistent: true,
            })
            .onOk(() => {
              this.axios
                .post(GRAPHQL_API_URL, {
                  query: print(CREATE_MARKING),
                  variables: { markingName: val },
                })
                .then((res) => {
                  console.log(res.data.data.createMarking);
                  this.markingOptions = [
                    ...this.markingOptions,
                    res.data.data.createMarking,
                  ];
                  this.input.marking = res.data.data.createMarking;
                })
                .catch((err) => console.log(err));

              done(val, "add-unique");
            });
        }
      }
    },
    handleDeleteMarking(id) {
      this.$q
        .dialog({
          title: "Please Confirm",
          message: `Are you sure you want to delete this marking from your markings?`,
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.axios
            .post(GRAPHQL_API_URL, {
              query: print(DELETE_MARKING),
              variables: { deleteMarkingId: id },
            })
            .then((res) => {
              if (res.data.data.deleteMarking === "true") {
                this.markingOptions = this.markingOptions.filter(
                  (el) => el.id !== id
                );
                this.input.marking = "";
              } else {
                this.$q.dialog({
                  title: "Can't delete",
                  message: `Can't delete this marking. It is connected to one or more sheep`,
                  persistent: true,
                });
              }
            });
        });
    },
    filterFn(val, update) {
      this.searchVal = val;
      update();
    },
    handleDeleteBreed(id) {
      this.$q
        .dialog({
          title: "Please Confirm",
          message: `Are you sure you want to delete this breed from your breeds?`,
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.axios
            .post(GRAPHQL_API_URL, {
              query: print(DELETE_BREED),
              variables: { deleteBreedId: id },
            })
            .then((res) => {
              if (res.data.data.deleteBreed === "true") {
                this.breedOptions = this.breedOptions.filter(
                  (el) => el.id !== id
                );

                this.input.breed = "";
              } else {
                this.$q.dialog({
                  title: "Can't delete",
                  message: `Can't delete this breed. It is connected to one or more sheep`,
                  persistent: true,
                });
              }
            });
        });
    },
    async fileInput(file) {
      if (this.picture_exists) {
        return this.sheep.picture;
      } else if (!file) {
        return null;
      } else {
        let filename = file.name;
        try {
          const storage = FirebaseStorage;
          const storageRef = ref(
            storage,
            `uploads/images/${Date.now()}-${filename}`
          );

          return uploadBytes(storageRef, file).then(() => {
            console.log(getDownloadURL(storageRef));
            return getDownloadURL(storageRef);
          });
        } catch (error) {
          console.log(error);
          this.$q.notify({
            type: "negative",
            message: `File upload failed`,
          });
        }
      }

      //  .catch((e) => {
      //    console.error(e);
      //   });
      // return result;
    },

    async addSheep(input, path) {
      const {
        tag_id,
        dob,
        sex,
        name,
        dop,
        breed,
        mother,
        father,
        color,
        marking,
        scrapie_id,
        date_deceased,
      } = input;
      return await this.axios.post(GRAPHQL_API_URL, {
        query: print(CREATE_SHEEP),
        variables: {
          picture: path,
          tagId: tag_id,
          dob: dob,
          sex: sex.id,
          name: name ? name : tag_id,
          purchaseDate: dop,
          breedId: breed.id,
          dam: mother?.sheep_id,
          sire: father?.sheep_id,
          colorId: color?.id,
          markingId: marking?.id,
          scrapieId: scrapie_id,
          dateDeceased: date_deceased,
        },
      });
    },

    async editSheep(input, path) {
      const {
        sheep_id,
        tag_id,
        dob,
        sex,
        name,
        dop,
        breed,
        mother,
        father,
        color,
        marking,
        scrapie_id,
        date_deceased,
      } = input;
      console.log(input);
      return await this.axios.post(GRAPHQL_API_URL, {
        query: print(UPDATE_SHEEP),
        variables: {
          sheepId: sheep_id,
          picture: path,
          tagId: tag_id,
          dob: dob,
          sex: sex.id,
          name: name,
          purchaseDate: dop,
          breedId: breed.id,
          dam: mother?.sheep_id,
          sire: father?.sheep_id,
          colorId: color?.id,
          markingId: marking?.id,
          scrapieId: scrapie_id,
          dateDeceased: date_deceased,
        },
      });
    },

    validateAndClose() {
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Submitted",
      });
      this.$emit("onClose", false);
    },

    async onSubmit() {
      const success = await this.$refs.form.validate();
      if (success) {
        await this.fileInput(this.input.picture).then((path) => {
          console.log(path);
          this.formTitle === "Add"
            ? this.addSheep(this.input, path).then((res) => {
                //console.log(res);
                this.$emit("update_data", res.data.data.createSheep);
                this.validateAndClose();
              })
            : this.editSheep(this.input, path).then((res) => {
                this.$emit("edit_data", res.data.data.updateSheep);
                this.validateAndClose();
              });
        });
      } else {
        console.log("validation failed");
        this.$q.notify({
          type: "negative",
          message: `Please fill out required fields`,
        });
      }
    },
    onRejected() {
      console.log("rejected");
      this.$q.notify({
        type: "negative",
        message: `File must be an image`,
      });
    },

    /*onSubmit() {
      console.log("validating");
      this.nameRef.validate();

      /*  const {
        tag_id,
        dob,
        sex,
        name,
        dop,
        breed,
        mother,
        father,
        color,
        marking,
        scrapie_id,
      } = this.input;
      this.axios
        .post(GRAPHQL_API_URL, {
          query: print(CREATE_SHEEP),
          variables: {
            tagId: tag_id,
            dob: dob,
            sex: sex,
            name: name,
            purchaseDate: dop,
            breedId: breed.id,
            dam: mother?.sheep_id,
            sire: father?.sheep_id,
            colorId: color?.id,
            markingId: marking?.id,
            scrapieId: scrapie_id,
          },
        })
        .then((res) => {
          console.log(res);
          alert("Sheep created successfully!");
          this.$emit("update_data", res.data.data.createSheep);
        });
      this.$q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Submitted",
      });
        }
      }
    },
  },

  //  },
  //  },*/
  },
};
</script>

<style lang="scss">
.input {
  padding-bottom: 20px;
}
.q-field__label {
  font-size: 18px !important;
  color: black !important;
}

.pic-preview {
  width: 200px;
  height: 200px;
  display: block;
  overflow: hidden;
  object-fit: cover;
}
img {
  height: 100%;
}
.icon_container {
  width: 35px;
  margin-left: 200px;
}
.col {
  flex: 1000 1 0% !important;
}
.pic-preview_container {
  height: 230px;
  width: 230px;
  display: flex;
  flex-direction: column;
}
</style>
