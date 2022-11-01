const express = require("express");
const app = express();
const noteApi = require("./api/note_api");
const note = new noteApi;

// データベースと接続
note.connect()

// Nodeサーバー立ち上げ
const server = app.listen(3001, function() {
  console.log("server running on port 3001");
});

// socket.io の設定
const io = require("socket.io")(server, {
  cors: {
    origins: [],
  },
});

// socket.io の接続
io.on("connection", (socket) => {
  // IDで検索
  socket.on("GET_DATA_BY_ID", (id, callback) => {
    note.getIdData(id).then(data => {
      callback({ DATA_BY_ID: data[0] });
      LogThrow(data, "sent data");
    });
  });

  // Vol.で検索
  socket.on("GET_DATA_BY_VOL", (vol, callback) => {
    note.getVolData(vol).then(data => {
      callback({ DATA_BY_VOL: data });
      LogThrow(data, "sent data");
    });
  });

  // データをダウンロード
  socket.on("DOWNLOAD_ALL_DATA", (callback) => {
    note.getAllData().then( json => {
      callback({ json: json });
      console.log("Download all data")
    } )
  });

  // 書き込み
  socket.on("SET_DATA", (content, callback) => {
    note.updateData(content).then( state => {
      callback({ status: state });
      LogThrow([content], "save");
    } )
  });

  // 新規作成
  socket.on("CREATE_DATA", (content, callback) => {
    note.insertData(content).then( state => {
      callback({ status: state });
      LogThrow([content], "save");
    });
  });

  // 削除
  socket.on("DELETE_DATA_BY_ID", (id, callback) => {
    note.deleteData(id).then(state => {
      callback({ status: state });
      console.log("delete id." + id);
    });
  });

});

function LogThrow(data, head = "") {
  data.forEach((d) => {
    console.log(head + ' "' + d.title + '"');
  });
}