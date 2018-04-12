var mysql = require('mysql');

let conf = {
    host: '127.0.0.1',
    user: 'root',
    password: '!95549LOVE',
    // password: 'admin123',
    database: 'test',
    port: 3306,
    multipleStatements: true//默认多个sql语句不支持  防止sql注入攻击
}
var connection = mysql.createConnection(conf);
// 创建连接池
var pool = mysql.createPool(conf);
var connectDb = function() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if(err) throw err;
            resolve(connection);
        })
    })
}

var dbQuery = function(sql, options='') {
    return new Promise((resolve, reject) => {
        return connectDb().then((connection) => {
            return connection.query(sql, options, (e, results) => {
                if(e) throw e;
                resolve(results);
                connection.release();
            })
        })
    })
}

module.exports = {connection, pool, dbQuery};