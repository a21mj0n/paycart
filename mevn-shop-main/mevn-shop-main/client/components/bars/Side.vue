<template>
  <a-layout-sider v-model="collapsed" collapsible>
    <div class="logo" />
    <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
      <a-menu-item
        v-for="(link, index) in links"
        :key="index"
      >
        <nuxt-link :to="{ name: link.name }">
          <a-icon type="pie-chart" />
          <span>{{ link.title }}</span>
        </nuxt-link>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  name: 'Side',
  data() {
    return {
      collapsed: false,
      links: [
        {
          title: 'Dashboard',
          name: 'admin-dashboard',
        },
        {
          title: 'Categories',
          name: 'admin-categories',
        },
        {
          title: 'Products',
          name: 'admin-products'
        }
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
</style>
