let mysql = require('mysql');
let conf = {
    host: '127.0.0.1',
    user: 'root',
    password: 'admin123',
    database: 'test',
    port: 3306
}
var connection = mysql.createConnection(conf);
// 创建连接池
var pool = mysql.createPool(conf);
module.exports = {connection, pool};