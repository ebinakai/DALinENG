exports.mysql_setting = {
    host: 'localhost',
    user: 'dev',
    password: 'sql',
    database: 'dal_in_eng',
};

exports.getAllArticleSQL = "SELECT * FROM article";
exports.insertRecordSQL = 'INSERT INTO article(title, vol, text) VALUES(?, ?, ?)';
exports.getVolSQL = 'SELECT * FROM article WHERE vol = ?';
exports.getIdSQL = 'SELECT * FROM article WHERE id = ?';
exports.updateSQL = 'UPDATE article SET title=?, text=? WHERE id = ?';
exports.deleteSQL = 'DELETE FROM article WHERE id = ?';
exports.createUser = "INSERT INTO users(name, password) VALUES(?, ?)";
exports.getUser = 'SELECT * FROM users WHERE name = ?';