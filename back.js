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
  // IDで検索
  socket.on("GET_DATA_BY_ID", function(id) {
    io.emit("DATA_BY_ID", ...json.filter((data) => {return data.id == id}));
  });

  // Vol.で検索
  socket.on("GET_DATA_BY_VOL", function(vol) {
    io.emit("DATA_BY_VOL", json.filter((data) => {return data.vol == vol}));
  });

  // IDで書き込み
  socket.on("SET_DATA_BY_ID", function(editedItem) {
    const jsonItem = json[json.indexOf(...json.filter((item) => {return item.id == editedItem.id}))];
    Object.keys(editedItem).forEach((key) => {
      jsonItem[key] = editedItem[key];
    });

    fs.writeFileSync("./public/database/data.json", JSON.stringify(json, null, ' '));
    io.emit("SET_DATA_BY_ID_COMPLETED", true);
  });

});