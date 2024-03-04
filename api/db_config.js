require("dotenv").config()

exports.mysql_setting = {
    connectionLimit: 3,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
};

exports.getAllArticleSQL = "SELECT * FROM article";
exports.insertRecordSQL = 'INSERT INTO article(title, vol, text) VALUES(?, ?, ?)';
exports.getVolSQL = 'SELECT * FROM article WHERE vol = ?';
exports.getIdSQL = 'SELECT * FROM article WHERE id = ?';
exports.updateSQL = 'UPDATE article SET title=?, text=? WHERE id = ?';
exports.deleteSQL = 'DELETE FROM article WHERE id = ?';
exports.createUser = "INSERT INTO users(name, password) VALUES(?, ?)";
exports.getUser = 'SELECT * FROM users WHERE name = ?';