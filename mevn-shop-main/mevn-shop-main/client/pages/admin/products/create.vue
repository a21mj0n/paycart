<template>
  <div class="admin-categories">
    <div>
      <a-button>Back</a-button>
    </div>
    <a-form
      :form="form"
      :layour="formLayout"
      @submit.prevent="create"
    >
      <a-row gutter="20">
        <a-col span="12">
          <a-form-item label="Name">
            <a-input
              v-decorator="[
            'title',
              { rules: [{ required: true, message: 'Please input your category name!' }] }
            ]"
            />
          </a-form-item>
        </a-col>
        <a-col span="12">
          <a-form-item label="Price">
            <a-input-number style="width: 100%" v-decorator="['price', { initialValue: 500 }]" :min="500" />
          </a-form-item>

        </a-col>
        <a-col span="8">
          <a-form-item label="Amount">
            <a-input-number style="width: 100%" v-decorator="['amount', { initialValue: 1 }]" :min="1" :max="100" />
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="Brand">
            <a-select
              v-decorator="[
          'brand_id',
          { rules: [{ required: true, message: 'Please select your brand!' }] },
        ]"
              placeholder="Select Brand"
            >
              <a-select-option value="male">
                male
              </a-select-option>
              <a-select-option value="female">
                female
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col span="8">
          <a-form-item label="Category">
            <a-select
              v-decorator="[
            'category_id',
              { rules: [{ required: true, message: 'Please select category!' }] },
            ]"
              placeholder="Select category"
            >
              <a-select-option
                v-for="category in categories"
                :key="category._id"
                :value="category._id"
              >
                {{ category.title }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-form-item label="Description">
          <a-textarea v-decorator="['description']" />
        </a-form-item>
      </a-row>
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
    title: 'Admin | Products - Create',
  },
  data() {
    return {
      formLayout: 'vertical',
      form: this.$form.createForm(this, { name: 'coordinated' }),
    };
  },
  async asyncData({ $axios }) {
    const categories = await $axios.$get('categories');
    // const brands = await $axios.$get('brands');
    return {
      categories,
      // brands,
    };
  },
  methods: {
    create() {
      this.form.validateFields(async (err, values) => {
        if (!err) {
          console.log(values);
          // const response = await this.$axios.$post('categories', values);
          // if (response) {
          //   await this.$router.push({ name: 'admin-products' });
          // }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .admin-categories {

  }
</style>
