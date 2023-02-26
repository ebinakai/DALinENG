const config  = require('./db_config');
const mysql = require('mysql2');
const util = require("./util");

class authDB {

  // SQLサーバーを設定
  constructor() {
    this.conn = mysql.createConnection(config.mysql_setting);
  }

  // SQLサーバーと接続
  connect() {
    this.conn.connect((err) => {
      if (err) {
        console.log(err.stack);
        return;
      } else {
        console.log("Successfully connected auth SQL server!");
      }
    });
  }

  // 新規ユーザーを作成
  async insertUser(userInfo) {
    return await new Promise((resolve, reject) => {
      let password = util.getHash(userInfo.password)
      this.conn.query(config.createUser, [userInfo.username, password], (error, results, fields) => {
        resolve(results);
      });
    });
  }

  // ユーザーの取得
  async getUser(username) {
    return await new Promise((resolve, reject) => {
      console.log(username);
      this.conn.query(config.getUser, [username], (error, results, fields) => {
        resolve(results);
      });
    });
  }
}

module.exports = authDB;
