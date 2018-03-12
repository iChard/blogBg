var connection = require('./conf/db').connection;
var pool = require('./conf/db').pool;


// var sql = 'SELECT * FROM Articles WHERE ID='+connection.escape(1)

// connection.connect();
// connection.query(sql, function(err, rows, fields) {
// // connection.query('SELECT * FROM Articles WHERE ID=?',[1], function(err, rows, fields) {
//     if(err) throw err;
//     console.log('数据库查询结果为:',Object.assign({}, {name: 'helloworld'}, rows[0]))
//     // console.log('数据库查询结果为:${}:',fields)
// })
// connection.end();

// pool.getConnection(function(err, connection) {
//     var post = {title: '插入标题', url: 'baidu.com', text: '内容', createdAt: new Date(), updatedAt: new Date()}
//     var query = connection.query('INSERT INTO Articles SET ?', post, function(err, results, fields) {
//         if(err) throw err;
//         connection.release()
//     })
//     console.log('query.sql:', query.sql);
// })

// pool.getConnection(function(err, connection) {
//     var sorter = 'createdAt';
//     // var sql = 'SELECT * FROM Articles ORDER BY '+ connection.escapeId(sorter);
//     var sql = 'SELECT * FROM Articles ORDER BY '+ connection.escapeId(sorter);
//     var query = connection.query(sql, function(err, results, fields) {
//         if(err) throw err;
//         console.log('排序结果为：', results);
//         connection.release()
//     })
//     console.log('connection.sql:', query.sql);
// })

pool.getConnection((err, connection) => {
    var d = {
        article_id: 121,
        author: '12',
        author_name: '路人甲',
        comments: '哈哈哈哈哈'
    }
    connection.query('INSERT INTO comments SET ?', d, (err, results, fields) => {
        if(err) throw err;
        console.log('文章插入完成！');
        connection.release();
    })
})

// pool.getConnection((err, connection) => {
//     let p = {
//         name: '111',
//         age: '232'
//     }
//     connection.query('INSERT INTO user SET ?', p, (err, results, fields) => {
//         if(err) throw err;
//         console.log('文章插入完成！');
//         connection.release();
//     })
// })