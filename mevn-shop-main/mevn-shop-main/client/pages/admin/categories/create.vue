<template>
  <div class="admin-categories">
    <div>
      <a-button>Back</a-button>
    </div>
    <a-form
      :form="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      @submit.prevent="create"
    >
      <a-form-item label="Name">
        <a-input
          v-decorator="[
            'title',
              { rules: [{ required: true, message: 'Please input your category name!' }] }
            ]"
        />
      </a-form-item>

      <a-form-item label="Icon">
        <a-input
          v-decorator="[
          'icon',
            { rules: [{ required: true, message: 'Please select category icon!' }] },
          ]"
          placeholder="Select icon for category"
        />
      </a-form-item>

      <a-form-item label="Icon List">
        <a-button
          type="dashed"
          @click="openIconsList"
        >
          See
          <a-icon type="arrow-right"></a-icon>
        </a-button>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">
          Create
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'categories-create',
  layout: 'admin',
  head: {
    title: 'Admin | Categories - Create',
  },
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
    };
  },
  methods: {
    create() {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const response = await this.$axios.$post('categories', values);
          if (response) {
            await this.$router.push({ name: 'admin-categories' });
          }
        }
      });
    },
    openIconsList() {
      window.open('https://antdv.com/components/icon/', '_blank', '400px; 400px');
    },
  },
};
</script>

<style lang="scss" scoped>
  .admin-categories {

  }
</style>
