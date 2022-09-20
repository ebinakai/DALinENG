const express = require("express");
const app = express();
const fs = require("fs");
let json = JSON.parse(fs.readFileSync("./public/database/data.json"));

const server = app.listen(3001, function() {
  console.log("server running on port 3001");
});

const io = require("socket.io")(server, {
  cors: {
    origins: ["http://192.168.68.50:8080/"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // ユニークなIDを取得
  socket.on("GET_NEW_ID", (callback) => {
    let newId = 1;
    while( true ) {
      if ( json.filter((data) => {return data.id == newId}).length === 0 ) {
        break;
      }
      newId ++;
    }
    callback({ NEW_ID: newId });
    // io.emit("NEW_ID", newId);
    LogThrow([{title: newId}], "new ID is");
  });

  // IDで検索
  socket.on("GET_DATA_BY_ID", (id, callback) => {
    const sendData = json.filter((data) => {return data.id == id})[0];
    callback({ DATA_BY_ID: sendData });
    LogThrow([sendData], "sent data");
  });

  // Vol.で検索
  socket.on("GET_DATA_BY_VOL", (vol, callback) => {
    const sendData = json.filter((data) => {return data.vol == vol});
    callback({ DATA_BY_VOL: sendData });
    LogThrow(sendData, "sent data");
  });

  // データをダウンロード
  socket.on("DOWNLOAD_ALL_DATA", () => {
    io.emit("ALL_DATA", json);
    console.log("Download all data")
  });

  // 書き込み
  socket.on("SET_DATA_BY_ID", (editedItem, callback) => {
    const jsonItem = json[json.indexOf(...json.filter((item) => {return item.id == editedItem.id}))];
    
    if (jsonItem === undefined) {
      json.push(editedItem);
    } else {
      Object.keys(editedItem).forEach((key) => {
        jsonItem[key] = editedItem[key];
      });
    }

    fs.writeFileSync("./public/database/data.json", JSON.stringify(json, null, ' '));
    callback({ status: true });
    LogThrow([editedItem], "save data");
  });

  // 削除
  socket.on("DELETE_DATA_BY_ID", (id, callback) => {

    const index = json.indexOf(...json.filter((item) => {return item.id == id}));
    console.log(json.splice(index, 1));
    fs.writeFileSync("./public/database/data.json", JSON.stringify(json, null, ' '));
    callback({ status: true });
    console.log("delete data id." + id);
  });

});

function LogThrow(data, head = "") {
  data.forEach((d) => {
    console.log(head + ' "' + d.title + '"');
  });
}