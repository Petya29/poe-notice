<template>
  <!-- <Main /> -->
  <router-view />
</template>

<script>
// import Main from './views/Main'

export default {
  name: 'App',
  components: {
    // Main
  },
  beforeCreate() {
    document.title = 'Poe-Notice'
  },
}
</script>

<style>
@font-face {
  font-family: "ITC Benguiat Std";
  src: local('BenguiatStd') url('./assets/fonts/BenguiatStd-Medium.otf') format("truetype");
}
#app {
  font-family: 'OpenSans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  padding-top: 60px;
  height: 100vh;
  /* background-image: url('https://thumbs.gfycat.com/DisguisedAdmiredHagfish-max-1mb.gif') !important; */
}
</style>
