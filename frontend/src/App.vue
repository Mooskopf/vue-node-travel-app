<template>
  <Layout>
    <RouterView />
  </Layout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Layout from './components/Layout.vue';
</script>

<style lang="scss">
@import url("./styles/main.scss");
</style>
