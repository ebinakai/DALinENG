const express = require('express');
const app = express();
const mysql = require('mysql2');
const dbConfig  = require('./public/javascript/db_config.js');
const jwtConfig  = require('./public/javascript/jwt_config.js');
const cors = require('cors');
const crypto = require('crypto');
const jwt = require("jsonwebtoken")

// ハッシュ値を返す
const getHash = (password) => crypto.createHash('sha256').update(password).digest('hex');

// トークンを返す
const getToken = (userInfo) => jwt.sign(userInfo, jwtConfig.secret, jwtConfig.options);

// トークンの有効を確認
const verifyToken = (token) => jwt.verify(token, jwtConfig.secret, jwtConfig.options);

// SQLサーバーを設定
const conn = mysql.createConnection(dbConfig.mysql_setting);

// SQLサーバーと接続
conn.connect((err) => {
  if (err) {
    console.log(err.stack);
    return;
  } else {
    console.log("success");
  }
});

// 新規ユーザーを作成
async function insertUser(userInfo) {
  return await new Promise((resolve, reject) => {
    let password = getHash(userInfo.password)
    conn.query(dbConfig.createUser, [userInfo.username, password], (error, results, fields) => {
      resolve(results);
    });
  });
  ;
}

// ユーザーの取得
async function getUser(username) {
  return await new Promise((resolve, reject) => {
    conn.query(dbConfig.getUser, [username], (error, results, fields) => {
      resolve(results);
    });
  });
  ;
}

// ログインAPIサーバー
app.use(cors({
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200
}))
app.use(express.json());

// ログイン
app.post('/login', (req, res) => {
  getUser(req.body.username).then( results => {
    if ( results.length == 0 ) {
      res.status(301).send("No This User");
      return;
    }

    if ( results[0].password !== getHash(req.body.password) ) {
      res.status(302).send("The password is incorrect");
      return;
    }
    
    res.status(200).send({token: getToken(req.body)});

  });
});

// トークン確認
app.post("/verify", (req, res) => {
  try {
    const decoded = verifyToken(req.body.token);
    res.send();
  } catch( err ) { 
    return res.send(401);
  }
});

// ログアウト
app.delete('/logout', (req, res) => {
  res.send('Deleted.')
});

// 新規ユーザー登録
app.post("/createuser", (req, res) => {  
  getUser(req.body.username).then( results => {
    if ( results.length != 0 ) {
      console.log("create user error...")
      res.status(301).send("Already used this Username");
    } else {
      console.log("create user successfully!")
      insertUser(req.body).then( results => { res.send(results) });
    }
  })

});

// express 起動
app.listen(3002, () => console.log('Listening on port 3002'));