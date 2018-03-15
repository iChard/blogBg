var express = require('express');
var router = express.Router();
var db = require('../conf/db');
var com = require('../lib/com');
var sqls = require('../lib/db/sqls');

var identityKey = 'skey';

router.post('/login', function(req, res, err) {
    if(err) console.error(err);
    // req.session.regenerate((err) => {
    //     if(err) {
    //         com.sendJson(res, {result: 701, message: '登录失败！'});
    //         return;
    //     }
    // })
    req.session.loginUser = req.body.name;
    com.sendJson(res)
})

router.get('/logout', (req, res, next) => {
    req.session.loginUser = null;
    com.sendJson(res)
})

module.exports = router;