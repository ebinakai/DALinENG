const crypto = require('crypto');
const jwt = require("jsonwebtoken")
const jwtConfig  = require('./jwt_config');

// ハッシュ値を返す
exports.getHash = (password) => crypto.createHash('sha256').update(password).digest('hex');

// トークンを返す
exports.getToken = (userInfo) => jwt.sign(userInfo, jwtConfig.secret, jwtConfig.options);

// トークンの有効を確認
exports.verifyToken = (token) => jwt.verify(token, jwtConfig.secret, jwtConfig.options);

exports.logThrow = (data, head="") => data.forEach( d => console.log(head + ' "' + d.title + '"'));