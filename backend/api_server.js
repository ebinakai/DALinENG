const authApi = require("./api/auth_api");
const noteApi = require("./api/note_api");
const util = require("./api/util");
const express = require('express');
const helmet = require('helmet');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// データベースと接続
let note = new noteApi;
let auth = new authApi;

// ログインAPIサーバー
const app = express();
app.use(express.json());
app.use(cookieParser());

// Helmetを有効にしてX-Powered-Byヘッダーを無効化
app.use(helmet.hidePoweredBy());

// CORSの設定
const frontend_url = process.env.FRONTEND_URL;
app.use(cors({
  origin: frontend_url,
  credentials: true,
  optionsSuccessStatus: 200
}));

// ログイン
app.post('/login', async function(req, res) {
  console.log( "login with the user", req.body.username )

  const results = await auth.getUser(req.body.username);
  let msg = "Login successfully";
    
  // データベースが
  if ( !Array.isArray(results) ) {
    msg = "No return available value from SQL server...";
    res.status(500).send(msg);

  } else if ( results.length == 0 ) {
    msg = "username or password is incorrect";
    res.status(401).send(msg);

  } else if ( results[0].password !== util.getHash(req.body.password) ) {
    msg = "username or password is incorrect";
    res.status(401).send(msg);

  } else {
    res.status(200).send({token: util.getToken(req.body)});
  }

  // ログを表示
  console.debug(msg);
  return;
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
app.post("/createuser", async function(req, res) {
  // CSRF対策
  try {
    const decoded = util.verifyToken(req.body.token);
  } catch( err ) { 
    return res.sendStatus(401);
  }

  const results = await auth.getUser(req.body.username);
  
  if ( results.length != 0 ) {
    console.log("create user error...")
    res.status(301).send("Already used this Username");
  } else {
    auth.insertUser(req.body).then( results => { res.send(results) });
    console.log("create user successfully!")
  }
});

// deepl-API プロキシ
const deepl_apikey = process.env.DEEPL_APIKEY;
app.post("/translate", async function(req, res) {
  // CSRF対策
  try {
    const decoded = util.verifyToken(req.body.token);
  } catch( err ) { 
    return res.sendStatus(401);
  }

  const url = 'https://api-free.deepl.com/v2/translate';

  try {
    const response = await axios.post(url, {
      text: [req.body.text],
      target_lang: req.body.targetLang,
    }, {
      headers: {
        'Authorization': `DeepL-Auth-Key ${deepl_apikey}`,
        'Content-Type': 'application/json',
      },
    });
    res.send(response.data.translations[0].text) // 翻訳結果を返す
  } catch (error) {
    console.error('error on translate api')
    const msg = error.response ? error.response.data : error.message
    res.status(301).send(msg);
  }
});

// express 起動
const server = app.listen(80, () => console.log('server running on port 80'));

// socket.io の設定
const io = require("socket.io")(server, {
  cors: {
    origin: frontend_url,
    methods: ["GET", "POST"]
  }
});

// socket.io の接続
io.on("connection", (socket) => {
  // IDで検索
  socket.on("GET_DATA_BY_ID", async (id, callback) => {
    const data = await note.getIdData(id);  // データベースと通信
    callback({ DATA_BY_ID: data[0] });
    util.logThrow(data, "sent data");
  });

  // Vol.で検索
  socket.on("GET_DATA_BY_VOL", async (vol, callback) => {
    const data = await note.getVolData(vol);
    callback({ DATA_BY_VOL: data });
    util.logThrow(data, "sent data");
  });

  // データをダウンロード
  socket.on("DOWNLOAD_ALL_DATA", async (callback) => {
    const json = await note.getAllData();
    callback({ json: json });
    console.log("Download all data");
  });

  // 書き込み
  socket.on("SET_DATA", async (content, callback) => {
    const state = await note.updateData(content);
    callback({ status: state });
    util.logThrow([content], "save");
  });

  // 新規作成
  socket.on("CREATE_DATA", async (content, callback) => {
    const data = await note.insertData(content);
    callback({ status: data.state, id: data.results.insertId });
    console.log({ status: data.state, id: data.results.insertId });
    util.logThrow([content], "save");
  });

  // 削除
  socket.on("DELETE_DATA_BY_ID", async (id, callback) => {
    const state = await note.deleteData(id);
    callback({ status: state });
    console.log("delete id." + id);
  });

});