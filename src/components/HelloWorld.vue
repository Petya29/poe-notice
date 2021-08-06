<template>
  <div class="container">
    <div class="log-messages">
      <h1>Client Log:</h1>
      <ul class="custom-list">
        <li v-for="logItem in clientLogs" :key="logItem">
          <div class="msg">{{ logItem }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import fs from "fs";
import { ref } from "vue";
import axios from "axios";
import readLastLines from "read-last-lines";

export default {
  name: "HelloWorld",
  setup() {
    const url =
      "https://api.telegram.org/bot1834009065:AAE25C9lQhwlR4o96VPmBJSzuscQ4r78bF0/sendMessage?chat_id=456418062&text=";
    const LogFile = "C:/GAMES/PoE/logs/Client.txt";
    const clientLogs = ref([]);
    fs.watchFile(LogFile, { interval: 100 }, () => {
      readLastLines.read(LogFile, 1).then((lines) => {
        const response = axios.post((url + lines).trim());
        console.log(response);
      });
    });

    return {
      clientLogs,
    };
  },
  mounted() {},
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
  margin: 5px 0;
  padding: 20px 30px;
  border-radius: 10px;
  background-color: #4d4d4d;
}
</style>
