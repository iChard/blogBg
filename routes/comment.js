var express = require('express');
var router = express.Router();
var db = require('../conf/db');
var com = require('../lib/com');
var sqls = require('../lib/sqls');
var sqlComment = sqls.comments;

router.get('/list', (req, res) => {
    var sess = req.session;
    var loginUser = sess.loginUser;
    com.sendJson(res);
})

router.post('/posts', (req, res) => {
    let data = req.body;
    let dbData = {
        comments: data.comment,
        article_id: data.articleId,
        author: '000',
        author_name: '路人甲',
        created: new Date(Number(data.created))
    }
    db.pool.getConnection((err, connection) => {
        connection.query(sqlComment.postForArticle, dbData, (err, results, fields) => {
            if(err) throw err;
            connection.query(sqlComment.queryById, results.insertId, (err, r, f) => {
                com.sendJson(res, com.objectKeyToHump(r[0]));
                connection.release();
            })
        })
    })
})

router.delete('/delete/:id', (req, res) => {
    console.log('req.params.id:', req.params.id);
    db.pool.getConnection((err, connection) => {
        if(err) throw err;
        connection.query(sqlComment.deleteById, req.params.id, (e, r, f) => {
            com.sendJson(res);
            connection.release();
        })
    })
})

module.exports = router;