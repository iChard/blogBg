var express = require('express');
var router = express.Router();
var db = require('../conf/db');
var com = require('../lib/com');
var sqls = require('../lib/db/sqls');

router.use('/', (req, res, next) => {
    if(req.session && req.session.loginUser) {
        next();
    } else {
        com.sendJson(res, null, {
            message: '未登录哦，请先登录吧',
            result: 700
        })
    }
})

router.get('/user', (req, res) => {
    if(req.session && req.session.loginUser) {
        com.sendJson(res);
    }
})

router.get('/articlesRelief', (req, res) => {
    db.pool.getConnection((err, connection) => {
        if(err) throw err;
        connection.query(sqls.articles.articlesRelief, (e, results, fields) => {
            let nlist = results.map(item => com.objectKeyToHump(item));
            com.sendJson(res, nlist);
            connection.release();
        })
    })
})

router.get('/article/:id', (req, res) => {
	db.pool.getConnection((err, connection) => {
		if(err) throw err;
		var {id} = req.params;
		connection.query('SELECT * FROM ?? WHERE ??=?', ['articles', 'id', id], (e, results, fields) => {
            com.sendJson(res, results[0]);
            connection.release();
		})		
	})
})

router.post('/editArticle/:id', (req, res) => {
    let {id} = req.params;
    let {title, updated, content, tags, category} = req.body;
    db.pool.getConnection((err, connection) => {
        if(err) throw err;
        connection.query(sqls.articles.editArticleById, [title, new Date(updated), content, tags, category, id], (e) => {
            if (e) throw e;
            com.sendJson(res);
            connection.release();
        })
    })
})

router.delete('/article/:id', (req, res) => {
    let {id} = req.params;
    db.pool.getConnection((err, connection) => {
        if(err) throw err;
        connection.query(sqls.articles.deleteArticleById, id, (e) => {
            if(e) throw e;
            com.sendJson(res);
        })
    })
})

module.exports = router;