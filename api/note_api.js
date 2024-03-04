const config  = require('./db_config');
const mysql = require('mysql2/promise');

class noteDB {

  // SQLサーバーを設定
  constructor() {
    this.pool = mysql.createPool(config.mysql_setting);
  }

  // Volでデータベースから取得
  async getVolData(vol) {
    const [results] = await this.pool.query(config.getVolSQL, [vol]);
    return results;
  }

  // IDでデータベースから取得
  async getIdData(id) {
    const [results] = await this.pool.query(config.getIdSQL, [id]);
    return results;
  }

  // データベースにレコードを追加
  async insertData(data) {
    try {
      const [results] = await this.pool.query(config.insertRecordSQL, [data.title, data.vol, data.text]);
      return { state: true, results };
    } catch (error) {
      console.error(error);
      return { state: false, results: null };
    }
  }

  // レコードを更新
  async updateData(data) {
    try {
      await this.pool.query(config.updateSQL, [data.title, data.text, data.id]);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  // データベースからレコードを削除
  async deleteData(id) {
    try {
      await this.pool.query(config.deleteSQL, [id]);
      return true;
    } catch (error) {
      console.error("error: ", error);
      return false;
    }
  }
}

module.exports = noteDB;
