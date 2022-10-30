<template>
  <main>
    <div class="wrapper">
      <div class="container mb-5">
        <div class="alert alert-success" role="alert">
          Click the botton below to download all data.
        </div>
        <input @click="DownloadAllData" class="btn btn-primary btn-lg mr-4" type="button" value="Download">
        <router-link to="/DALeng" class="btn btn-secondary btn-lg">Home</router-link>
      </div>

      <div class="container">
        <h2 class="alert alert-primary" role="alert">Create New User</h2>
        <div v-if="create_user_res.flag" class="alert alert-success mt-4 create-user-alert">
          {{ create_user_res.msg }}
        </div>
        <form v-on:submit.prevent="createUser()">
          <div class="form-group">
            <label for="createUserName">username</label>
            <input type="text" class="form-control" id="createUserName" v-model="user.username" placeholder="username" autocomplete="username">
          </div>
          <div class="form-group">
            <label for="createUserPassword">Password</label>
            <input type="password" class="form-control" id="createUserPassword" v-model="user.password" placeholder="Password" autocomplete="new-password">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" id="createUserPasswordRe" v-model="user.passwordre" placeholder="Password 1 more" autocomplete="new-password">
          </div>
          <div v-if="incorrect_pass" class="alert alert-danger">
            Please check your password
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
  import io from "socket.io-client";
  import jszip from "jszip";
  import store from '../store/index';
  import auth from "../api/auth"
  export default {
    name: "ControlPanel",
    data: () => ({
      socket: io(store.state.urlDb),
      incorrect_pass: false,
      user: {},
      create_user_res: {
        flag: false,
        msg: ""
      }
    }),
    methods: {
      DownloadAllData() {
        this.socket.emit("DOWNLOAD_ALL_DATA", (response) => {

          let zip = new jszip;
          
          response["json"].forEach((content) => {
            // txt を作成
            let outData = "Vol." + content.vol + "\n" + content.title + "\n\n" + content.text + "\n\n\n\n";

            // zip にファイルを追加
            let filename = "Vol" + content.vol + " " + content.title + ".txt";
            zip.folder('DATE-A-LIVE-ENCORE-ENGLISH').file(filename, outData);
          });

          // zip をまとめる -> ダウンロード
          zip.generateAsync({type:'blob'}).then(function(blob){
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'DATE-A-LIVE-ENCORE-ENGLISH.zip';
            link.click();
          })

        });
      },
      createUser() {
        if ( this.user.password !== this.user.passwordre ) {
          this.incorrect_pass = true;
          return;
        } else {
          this.incorrect_pass = false;
        }

        auth.createUser(this.user)
        .then( res => {
          this.create_user_res.flag = true;
          this.create_user_res.msg = "Create New User Successfully";
          $(".create-user-alert")
            .removeClass("alert-danger")
            .addClass("alert-success");

          // Form をクリア
          this.user = {};
        })
        .catch( error => { 
          this.create_user_res.flag = true;
          this.create_user_res.msg = error.response.data;
          $(".create-user-alert")
            .removeClass("alert-success")
            .addClass("alert-danger");
          throw error;
        });
      }
    },
  };
</script>