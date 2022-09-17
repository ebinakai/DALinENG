const express = require("express");
const app = express();
const fs = require("fs");
let json = JSON.parse(fs.readFileSync("./public/database/data.json"));

const server = app.listen(3001, function() {
  console.log("server running on port 3001");
});

const io = require("socket.io")(server, {
  cors: {
    origins: ["http://localhost:5173/"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // ユニークなIDを取得
  socket.on("GET_NEW_ID", function() {
    let newId = 1;
    while( true ) {
      if ( json.filter((data) => {return data.id == newId}).length === 0 ) {
        break;
      }
      newId ++;
    }
    io.emit("NEW_ID", newId);
    LogThrow([{title: newId}], "new ID is");
  });

  // IDで検索
  socket.on("GET_DATA_BY_ID", function(id) {
    const sendData = json.filter((data) => {return data.id == id});
    io.emit("DATA_BY_ID", ...sendData);
    LogThrow(sendData, "sent data");
  });

  // Vol.で検索
  socket.on("GET_DATA_BY_VOL", function(vol) {
    console.log(vol);
    const sendData = json.filter((data) => {return data.vol == vol});
    io.emit("DATA_BY_VOL", sendData);
    LogThrow(sendData, "sent data");
  });

  // 書き込み
  socket.on("SET_DATA_BY_ID", function(editedItem) {
    const jsonItem = json[json.indexOf(...json.filter((item) => {return item.id == editedItem.id}))];
    
    if (jsonItem === undefined) {
      json.push(editedItem);
    } else {
      Object.keys(editedItem).forEach((key) => {
        jsonItem[key] = editedItem[key];
      });
    }

    fs.writeFileSync("./public/database/data.json", JSON.stringify(json, null, ' '));
    io.emit("SET_DATA_BY_ID_COMPLETED", true);
    LogThrow([editedItem], "save data")
  });

});

function LogThrow(data, head = "") {
  data.forEach((d) => {
    console.log(head + ' "' + d.title + '"');
  });
}