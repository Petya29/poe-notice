<template>
  <Main />
</template>

<script>
import Main from './views/Main'

export default {
  name: 'App',
  components: {
    Main
  },
  beforeCreate() {
    document.title = 'Poe-Notice'
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700");
#app {
  font-family: 'OpenSans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 60px;
}
</style>
