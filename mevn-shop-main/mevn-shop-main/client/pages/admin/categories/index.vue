<template>
  <div class="admin-categories">
    <div>
      <a-button
        type="primary"
        @click="$router.push({ name: 'admin-categories-create' })"
      >
        Create Category
      </a-button>
    </div>
    <a-table
      :key="tableKey"
      size="small"
      bordered
      :data-source="categories"
      :columns="columns"
    >
      <template slot="icon" slot-scope="icon">
        <a-icon :type="icon" />
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
  name: 'categories-index',
  layout: 'admin',
  head: {
    title: 'Admin | Categories',
  },
  data() {
    return {
      tableKey: 0,
      columns: [
        {
          title: 'Name',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Icon',
          dataIndex: 'icon',
          key: 'icon',
          scopedSlots: { customRender: 'icon' },
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
    const categories = await $axios.$get('categories');
    return {
      categories,
    };
  },
  methods: {
    async getCategories() {
      this.categories = await this.$axios.$get('categories');
    },
    showDeleteConfirm(id) {
      const $this = this;
      this.$confirm({
        title: 'Are you sure delete this category?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        async onOk() {
          console.log(id);
          const response = await $this.$axios.$delete(`categories/${id}`);
          if (response) {
            await $this.getCategories();
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
