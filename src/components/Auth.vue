<template>
  <video autoplay muted loop class="bg-video">
    <source src="../assets/videos/ulya.mp4" type="video/mp4" />
  </video>
  <div class="bg-wrap"></div>
  <div class="container">
    <div class="auth">
      <h4 class="card">
        Please join to our Telegram bot, who be sent your trade messages to you.
        <span class="bot-link" @click="openBrowser('https://t.me/POEnot_bot')"
          >https://t.me/POEnot_bot</span
        >
      </h4>
      <h4 class="card chat-id-title">Enter your chat id</h4>
      <div class="row chat-id">
        <div
          :class="[
            'input-field',
            'col s12',
            { 'input-field-error': validateError },
          ]"
        >
          <input
            id="password"
            type="password"
            class="validate"
            v-model="newChatId"
          />
          <small class="chat_id-danger" v-if="validateError"
            >chat id cannot be empty</small
          >
          <label for="password">chat id</label>
        </div>
      </div>
      <a class="waves-effect waves-light btn" @click="storeChatId">Save</a>
    </div>
    <div class="main"></div>
    <scale-loader
      :loading="loading"
      :color="'#ffffff'"
      :height="'200px'"
      :width="'200px'"
    ></scale-loader>
  </div>
</template>

<script>
import fs from "fs";
import { ref } from "vue";
import { shell, remote } from "electron";
import axios from "axios";
import M from "materialize-css";
import readLastLines from "read-last-lines";
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";

export default {
  name: "Main",
  setup() {
    const validateError = ref(false);
    const loading = ref(false);
    const newChatId = ref("");
    const chatId = "123";
    const url = `${process.env.VUE_APP_TELEGRAM_API}sendMessage?chat_id=${chatId}&text=`;
    const LogFile = process.env.VUE_APP_LOG_PATH; //TODO Launcher + Steam log path
    fs.watchFile(LogFile, { interval: 450 }, () => {
      readLastLines.read(LogFile, 1).then((lines) => {
        axios.post((url + lines).trim());
        console.log(typeof lines);
      });
    });

    function openBrowser(url) {
      shell.openExternal(url);
    }

    function storeChatId() {
      if (newChatId.value != "") {
        const storagePath = `${remote.app.getPath(
          "home"
        )}\\AppData\\Local\\${remote.app.getName()}`;
        if (!fs.existsSync(storagePath)) {
          fs.mkdirSync(storagePath);
        }
        if (!fs.existsSync(`${storagePath}\\data.json`)) {
          const dataJSON = {
            chat_id: newChatId.value,
          };
          fs.writeFileSync(
            `${storagePath}\\data.json`,
            JSON.stringify(dataJSON)
          );
        } else {
          if (
            Object.keys(fs.readFileSync(`${storagePath}\\data.json`)).length > 0
          ) {
            const dataJSON = JSON.parse(
              fs.readFileSync(`${storagePath}\\data.json`)
            );
            if (
              dataJSON["chat_id"] !== undefined ||
              dataJSON["chat_id"] !== ""
            ) {
              dataJSON["chat_id"] = newChatId.value;
              fs.writeFileSync(
                `${storagePath}\\data.json`,
                JSON.stringify(dataJSON)
              );
            }
          }
        }
        validateError.value = false;
      } else {
        validateError.value = true;
      }
    }

    return {
      validateError,
      loading,
      newChatId,
      openBrowser,
      storeChatId,
    };
  },
  components: { ScaleLoader },
  mounted() {
    M.AutoInit();
  },
  beforeCreate() {

  }
};
</script>

<style scoped>
* {
  font-family: "BenguiatStd";
}
.bg-video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
}
.bg-wrap {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 0.6) !important;
}
.auth {
  padding: 0 50px;
}
.chat-id {
  max-width: 300px !important;
}
.validate {
  color: #ffffff !important;
}
.bot-link {
  display: block;
  cursor: pointer;
  margin: 20px 0;
  color: #1f1fe9 !important;
}
.chat_id-danger {
  margin-top: -5px;
  color: rgb(238, 75, 75) !important;
  float: left;
}
.input-field-error input {
  border-color: rgb(238, 75, 75) !important;
  box-shadow: 0 1px 0 0 rgb(238, 75, 75) !important;
}
.input-field-error label {
  color: rgb(238, 75, 75) !important;
}
.card {
  padding: 15px 20px 5px 20px;
  border-radius: 10px;
  background-color: #252525;
}
.chat-id-title {
  padding: 15px 10px;
}
</style>
