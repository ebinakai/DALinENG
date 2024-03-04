const config  = require('./db_config');
const mysql = require('mysql2/promise');
const util = require("./util");

class authDB {

  // SQLサーバーを設定
  constructor() {
    this.pool = mysql.createPool(config.mysql_setting);
  }

  // 新規ユーザーを作成
  async insertUser(userInfo) {
    let password = util.getHash(userInfo.password);
    const [results] = await this.pool.query(config.createUser, [userInfo.username, password]);
    return results;
  }

  // ユーザーの取得
  async getUser(username) {
    const [results] = await this.pool.query(config.getUser, [username]);
    return results;
  }
}

module.exports = authDB;
