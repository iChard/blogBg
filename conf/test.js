var db = require('./db');
var sqls = require('../lib/sqls');
var dbQuery = db.dbQuery;
var moment = require('moment');
let format = 'YYYY-MM-DD HH:mm:ss';
// db.pool.getConnection((err, connection) => {
//     if(err) console.error(err);
//     connection.query(sqls.tags.insert, ['哈哈', new Date()], (e, results, fields) => {
//         if(e) console.error(e);
//         console.log('results:', results);
//         console.log('fields:', fields);
//         connection.release();
//     })
// })
// dbQuery(sqls.tags.list, ['哈哈', new Date()]).then(res => {
//     console.log('res:', res);
    
// })
dbQuery(`INSERT INTO categories (name, created) VALUES ("哈哈", "${moment().format(format)}"), ("哈11哈1", "${moment().format(format)}")`)