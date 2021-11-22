<template>
  <div class="admin-categories">
    <div>
      <a-button
        type="primary"
        @click="$router.push({ name: 'admin-products-create' })"
      >
        Create Product
      </a-button>
    </div>
    <a-table
      size="small"
      bordered
      :data-source="products"
      :columns="columns"
    >
      <template slot="image" slot-scope="image">
        <a-avatar
          size="large"
          shape="square"
          :src="image"
        />
      </template>
      <template slot="category" slot-scope="category">
        <a-tag>
          {{ category }}
        </a-tag>
      </template>
      <template slot="actions" slot-scope="id">
        <a-button type="danger" @click="showDeleteConfirm(id)">
          Delete
          <a-icon type="delete"></a-icon>
        </a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  name: 'products-index',
  layout: 'admin',
  head: {
    title: 'Admin | Products',
  },
  data() {
    return {
      columns: [
        {
          title: 'Image',
          dataIndex: 'image',
          key: 'image',
          scopedSlots: { customRender: 'image' },
        },
        {
          title: 'Name',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: 'Category',
          dataIndex: 'category',
          key: 'category',
          scopedSlots: {
            customRender: 'category',
          },
        },
        {
          title: 'Actions',
          dataIndex: '_id',
          key: 'actions',
          scopedSlots: { customRender: 'actions' },
        },
      ],
    };
  },
  async asyncData({ $axios }) {
    const products = await $axios.$get('products');
    console.log(products);
    return {
      products,
    };
  },
  methods: {
    async getProducts() {
      this.products = await this.$axios.$get('products?include=category');
    },
    showDeleteConfirm(id) {
      const $this = this;
      this.$confirm({
        title: 'Are you sure delete this product?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
          const response = await $this.$axios.$delete(`products/${id}`);
          if (response) {
            await $this.getProducts();
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .admin-categories {

  }
</style>
