const express = require('express');
const app = express();
const cors = require('cors');
const crypto = require('crypto');
const jwt = require("jsonwebtoken")
const jwtConfig  = require('./public/javascript/jwt_config');
const authApi = require("./api/auth_api");
const auth = new authApi;

// ハッシュ値を返す
const getHash = (password) => crypto.createHash('sha256').update(password).digest('hex');

// トークンを返す
const getToken = (userInfo) => jwt.sign(userInfo, jwtConfig.secret, jwtConfig.options);

// トークンの有効を確認
const verifyToken = (token) => jwt.verify(token, jwtConfig.secret, jwtConfig.options);

// データベースと接続
auth.connect();

// ログインAPIサーバー
app.use(cors({
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200
}))
app.use(express.json());

// ログイン
app.post('/login', (req, res) => {
  auth.getUser(req.body.username).then( results => {
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
app.listen(3002, () => console.log('Listening on port 3002'));