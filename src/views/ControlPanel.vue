<template>
  <main>
    <div class="wrapper">
      <div class="container">
        <div class="alert alert-success" role="alert">
          Click the botton below to download all data.
        </div>
        <input @click="DownloadAllData" class="btn btn-primary btn-lg mr-4" type="button" value="Download">
        <router-link to="/" class="btn btn-secondary btn-lg">Home</router-link>
      </div>
    </div>
  </main>
</template>

<script>
  import io from "socket.io-client";
  import jszip from "jszip";
  export default {
    name: "ControlPanel",
    data: () => ({
      socket: io("http://localhost:3001", {}),
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
    },
  };
</script>