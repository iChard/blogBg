var express = require('express');
var router = express.Router();
var db = require('../conf/db');
var com = require('../lib/com');
var sqls = require('../lib/db/sqls');

router.use('/', (req, res, next) => {
    if(!req.session) {
        res.redirect('/login');
    } else {
        next();
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

module.exports = router;