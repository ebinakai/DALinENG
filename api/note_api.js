const config  = require('./db_config');
const mysql = require('mysql2');

class noteDB {

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
        console.log("Successfully connected note SQL server!");
      }
    });
  }

  // すべてのレコードをデータベースから取得
  async getAllData() {
    return await new Promise((resolve, reject) => {
      this.conn.query(config.getAllArticleSQL, (error, results, fields) => {
        resolve(results);
      });
    });
  }

  // Volでデータベースから取得
  async getVolData(vol) {
    return await new Promise((resolve, reject) => {
      this.conn.query(config.getVolSQL, [vol], (error, results, fields) => {
        resolve(results);
      });
    });
  }

  // IDでデータベースから取得
  async getIdData(id) {
    return await new Promise((resolve, reject) => {
      this.conn.query(config.getIdSQL, [id], (error, results, fields) => {
        resolve(results);
      });  
    });
  }

  // データベースにレコードを追加
  async insertData(data) {
    return await new Promise((resolve, reject) => {
      this.conn.query(config.insertRecordSQL, [data.title, data.vol, data.text], (error, results, fields) => {
        if (!error) {
          resolve({state: true, results: results});
        } else {
          resolve({state: false, results: results});
        }
      });
    }); 
  }

  // レコードを更新
  async updateData(data) {
    return await new Promise((resolve, reject) => {
      this.conn.query(config.updateSQL, [data.title, data.text, data.id], (error, results, fields) => {
        if (!error) {
          resolve(true);
        } else {
          resolve(false);
        }
      }); 
    });
  }

  // データベースからレコードを削除
  async deleteData(id) {
    return await new Promise((resolve, reject) => {
      this.conn.query(config.deleteSQL, [id], (error, results, fields) => {
        if ( !error ) {
          resolve(true);
        } else {
          console.log("error: ", error);
          resolve(false);
        }
      }); 
    });
  }

}

module.exports = noteDB;
