<template>
  <div class="container">
    <div class="log-messages">
      <h1>Client Log</h1>
      <ul class="custom-list">
        <li v-for="logItem in 10" :key="logItem">
          <div class="msg">{{ logItem }} item of list</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const fs = require('fs')

export default {
  name: "HelloWorld",
  data() {
    return {
      data: null,
    };
  },
  methods: {
    getLogData() {
      console.log(fs)
    }
  },
  mounted() {
    this.getLogData()
  }
};
</script>

<style scoped>
h1 {
  margin-left: 15px;
  text-align: left;
}
.custom-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.custom-list li {
  margin-left: 15px;
  text-align: left;
}
.msg {
  display: inline-block;
  margin: 15px 0;
  padding: 20px 30px;
  border-radius: 10px;
  background-color: #4d4d4d;
}
</style>
