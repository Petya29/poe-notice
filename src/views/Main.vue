<template>
  <div class="container">
    <div class="auth" v-if="!$store.state.chat_id">
      <h4>
        Please join to our Telegram bot, who be sent your trade messages to you.
        <br />
        <br />
        <a href="https://t.me/POEnot_bot" target="_blank"
          >https://t.me/POEnot_bot</a
        >
        <br />
        <br />
        Enter your chat id
      </h4>
      <div class="row chat-id">
        <div class="input-field col s12">
          <input
            id="password"
            type="password"
            class="validate"
            v-model="newChatId"
          />
          <label for="password">chat id</label>
        </div>
      </div>
      <a class="waves-effect waves-light btn">Save</a>
    </div>
    <div class="main"></div>
    <scale-loader
      :loading="loading"
      :color="color"
      :height="height"
      :width="width"
    ></scale-loader>
  </div>
</template>

<script>
import fs from "fs";
import { ref } from "vue";
import axios from "axios";
import M from "materialize-css";
import readLastLines from "read-last-lines";
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";

export default {
  name: "HelloWorld",
  setup() {
    const loading = ref(false);
    const chatId = "123";
    const url = `${process.env.VUE_APP_TELEGRAM_API}sendMessage?chat_id=${chatId}&text=`;
    const LogFile = process.env.VUE_APP_LOG_PATH;
    console.log(LogFile);
    const clientLogs = ref([]);
    fs.watchFile(LogFile, { interval: 100 }, () => {
      readLastLines.read(LogFile, 1).then((lines) => {
        axios.post((url + lines).trim());
        console.log(typeof lines);
      });
    });

    return {
      loading,
      clientLogs,
    };
  },
  components: { ScaleLoader },
  mounted() {
    M.AutoInit();
  },
};
</script>

<style scoped>
.auth {
  padding: 0 50px;
}
.chat-id {
  max-width: 300px !important;
}
.validate {
  color: #ffffff !important;
}
</style>
