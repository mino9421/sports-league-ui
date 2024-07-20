<template>
  <MainLayout class="global-style" />
</template>

<script>
import MainLayout from "./layout/MainLayout.vue";

export default {
  name: "App",
  components: {
    MainLayout,
  },
};
</script>

<style>
@import "./index.css";

.global-style {
  font-family: Arial, sans-serif;
  /* margin: 0;
  padding: 0; */
}
</style>
