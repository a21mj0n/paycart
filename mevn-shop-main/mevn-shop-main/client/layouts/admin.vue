<template>
  <a-layout id="components-layout-demo-side">
    <bars-side></bars-side>

    <a-layout style="background-color: #aac9c6; min-height: 100vh">
      <a-layout-header style="background: #fff; padding: 0" />

      <a-layout-content style="margin: 0 16px;">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>

        <div :style="{ padding: '24px', background: '#fff', }">
          <Nuxt />
        </div>
      </a-layout-content>

    </a-layout>
  </a-layout>
</template>

<script>
export default {
  name: 'admin',
};
</script>

<style lang="scss" scoped>
</style>
