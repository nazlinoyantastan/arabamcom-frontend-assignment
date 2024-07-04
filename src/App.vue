<template>
  <header>
    <AppHeader></AppHeader>
  </header>
  <body>
    <div id="app">
      <router-view></router-view>
    </div>
  </body>
  <footer>
    <AppFooter></AppFooter>
  </footer>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style>
header{
  background-color: #ffffff;
}
body {
  background-color: #f7f7f7 !important ;
  margin: 0; 
  padding: 0; 
}
</style>
