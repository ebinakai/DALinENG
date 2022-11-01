const config  = require('../public/javascript/db_config.js');
const mysql = require('mysql2');

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
        console.log("success");
      }
    });
  }

  // 新規ユーザーを作成
  async insertUser(userInfo) {
    return await new Promise((resolve, reject) => {
      let password = getHash(userInfo.password)
      this.conn.query(config.createUser, [userInfo.username, password], (error, results, fields) => {
        resolve(results);
      });
    });
  }

  // ユーザーの取得
  async getUser(username) {
    return await new Promise((resolve, reject) => {
      this.conn.query(config.getUser, [username], (error, results, fields) => {
        resolve(results);
      });
    });
  }
}

module.exports = authDB;
