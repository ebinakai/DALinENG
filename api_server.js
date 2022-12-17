const authApi = require("./api/auth_api");
const noteApi = require("./api/note_api");
const util = require("./api/util");
const express = require('express');
const cors = require('cors');


// データベースと接続
const note = new noteApi;
note.connect()

const auth = new authApi;
auth.connect();

// ログインAPIサーバー
const app = express();
app.use(cors({
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200
}))
app.use(express.json());

// ログイン
app.post('/login', (req, res) => {
  auth.getUser( req.body.username ).then( results => {
    
    if ( !Array.isArray(results) ) {
      res.status(500).send("No return available value from SQL server...");
    } else if ( results.length == 0 ) {
      res.status(301).send("No This User");
      return;
    }
    
    console.log(results);
    if ( results[0].password !== util.getHash(req.body.password) ) {
      res.status(302).send("The password is incorrect");
      return;
    }
    
    res.status(200).send({token: util.getToken(req.body)});
  });
});

// トークン確認
app.post("/verify", (req, res) => {
  try {
    const decoded = util.verifyToken(req.body.token);
    res.send();
  } catch( err ) { 
    return res.sendStatus(401);
  }
});

// ログアウト
app.delete('/logout', (req, res) => {
  res.send('Deleted.')
});

// 新規ユーザー登録
app.post("/createuser", (req, res) => {  
  auth.getUser(req.body.username).then( results => {
    if ( results.length != 0 ) {
      console.log("create user error...")
      res.status(301).send("Already used this Username");
    } else {
      console.log("create user successfully!")
      auth.insertUser(req.body).then( results => { res.send(results) });
    }
  })

});

// express 起動
const server = app.listen(3001, () => console.log('server running on port 3001'));

// socket.io の設定
const io = require("socket.io")(server, {cors: { origins: [] }});

// socket.io の接続
io.on("connection", (socket) => {
  // IDで検索
  socket.on("GET_DATA_BY_ID", (id, callback) => {
    note.getIdData(id).then(data => {
      callback({ DATA_BY_ID: data[0] });
      util.logThrow(data, "sent data");
    });
  });

  // Vol.で検索
  socket.on("GET_DATA_BY_VOL", (vol, callback) => {
    note.getVolData(vol).then(data => {
      callback({ DATA_BY_VOL: data });
      util.logThrow(data, "sent data");
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
      util.logThrow([content], "save");
    } )
  });

  // 新規作成
  socket.on("CREATE_DATA", (content, callback) => {
    note.insertData(content).then( state => {
      callback({ status: state });
      util.logThrow([content], "save");
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