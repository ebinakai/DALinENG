const util = require("./util");

process.argv.forEach((val, index) => {});
// コマンドライン引数からパスワードを取得
let password = process.argv[2];

if ( password === undefined ) {
  console.log("Please enter a password as an argument.");
  return;
}

let password_hash = util.getHash(password);
console.log(password_hash);