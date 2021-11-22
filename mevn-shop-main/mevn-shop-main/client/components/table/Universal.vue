<template>
  <a-table
    bordored
    :data-source="data"
    :columns="columns"
  ></a-table>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  name: 'Universal',
  props: {
    data: VueTypes.array.isRequired,
    columns: VueTypes.array.isRequired,
  },
};
</script>

<style scoped>

</style>
