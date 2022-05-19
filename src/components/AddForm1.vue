<template>
  <q-dialog :formOpen="formOpen">
    <q-card>
      <q-card-section>
        <div class="text-h6">Add New</div>
      </q-card-section>
      <q-separator />

      <q-card-section style="max-height: 50vh" class="scroll">
        <q-form
          ref="form"
          @submit="onSubmit"
          @cancel="onCancel"
          class="q-gutter-md"
          greedy
        >
          <q-input
            name="name"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
            v-model="input.name"
            label="Name"
          />
          <q-input
            name="dob"
            v-model="input.dob"
            filled
            type="date"
            hint="Date of birth"
          />
          <q-separator />

          <div>
            <q-btn flat label="Cancel" color="secondary" v-close-popup />
            <q-btn
              type="submit"
              flat
              label="Add"
              color="primary"
              v-close-popup
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      input: {
        name: null,
        dob: null,
      },
    };
  },
  methods: {
    async onSubmit() {
      const success = await this.$refs.form.validate();
      if (success) {
        console.log("success");
      } else {
        console.log("fail");
      }
    },
  },
};
</script>
