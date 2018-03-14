let mysql = require('mysql');
let conf = {
    host: '127.0.0.1',
    user: 'root',
    password: '!95549LOVE',
    database: 'test',
    port: 3306
}
var connection = mysql.createConnection(conf);
// 创建连接池
var pool = mysql.createPool(conf);
module.exports = {connection, pool};
