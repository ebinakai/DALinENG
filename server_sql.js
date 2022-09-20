const express = require("express");
const app = express();
const fs = require("fs");
const mysql = require('mysql2');
const config  = require('./public/javascript/db_config.js');
let json = JSON.parse(fs.readFileSync("./public/database/data.json"));

const server = app.listen(3001, function() {
  console.log("server running on port 3001");
});

const io = require("socket.io")(server, {
  cors: {
    origins: [],
  },
});

// SQLサーバーを設定
const conn = mysql.createConnection(config.mysql_setting);

// SQLサーバーと接続
conn.connect((err) => {
  if (err) {
    console.log(err.stack);
    return;
  } else {
    console.log("success");
  }
});

// すべてのレコードをデータベースから取得
async function getAllData() {
  return await new Promise((resolve, reject) => {
    conn.query(config.getAllArticleSQL, (error, results, fields) => {
      resolve(results);
    });
  });
}

// Volでデータベースから取得
async function getVolData(vol) {
  return await new Promise((resolve, reject) => {
    conn.query(config.getVolSQL, [vol], (error, results, fields) => {
      resolve(results);
    });
  });
  ;
}

// IDでデータベースから取得
async function getIdData(id) {
  return await new Promise((resolve, reject) => {
    conn.query(config.getIdSQL, [id], (error, results, fields) => {
      resolve(results);
    });  
  });
}

// データベースにレコードを追加
async function insertData(data) {
  return await new Promise((resolve, reject) => {
    conn.query(config.insertRecordSQL, [data.title, data.vol, data.text], (error, results, fields) => {
      if (!error) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }); 
}

// レコードを更新
async function updateData(data) {
  return await new Promise((resolve, reject) => {
    conn.query(config.updateSQL, [data.title, data.text, data.id], (error, results, fields) => {
      if (!error) {
        resolve(true);
      } else {
        resolve(false);
      }
    }); 
  });
}

// データベースからレコードを削除
async function deleteData(id) {
  return await new Promise((resolve, reject) => {
    conn.query(config.deleteSQL, [id], (error, results, fields) => {
      if ( !error ) {
        resolve(true);
      } else {
        console.log("error: ", error);
        resolve(false);
      }
    }); 
  });
}

io.on("connection", (socket) => {
  // IDで検索
  socket.on("GET_DATA_BY_ID", (id, callback) => {
    getIdData(id).then(data => {
      callback({ DATA_BY_ID: data[0] });
      LogThrow(data, "sent data");
    });
  });

  // Vol.で検索
  socket.on("GET_DATA_BY_VOL", (vol, callback) => {
    getVolData(vol).then(data => {
      callback({ DATA_BY_VOL: data });
      LogThrow(data, "sent data");
    });
  });

  // データをダウンロード
  socket.on("DOWNLOAD_ALL_DATA", () => {
    io.emit("ALL_DATA", json);
    console.log("Download all data")
  });

  // 書き込み
  socket.on("SET_DATA", (content, callback) => {
    updateData(content).then( state => {
      callback({ status: state });
      LogThrow([content], "save data");
    } )
  });

  // 新規作成
  socket.on("CREATE_DATA", (content, callback) => {
    insertData(content).then( state => {
      callback({ status: state });
      LogThrow([content], "save data");
    });
  });

  // 削除
  socket.on("DELETE_DATA_BY_ID", (id, callback) => {
    deleteData(id).then(state => {
      callback({ status: state });
      console.log("delete data id." + id);
    });
  });

});

function LogThrow(data, head = "") {
  data.forEach((d) => {
    console.log(head + ' "' + d.title + '"');
  });
}