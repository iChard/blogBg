var express = require('express');
var router = express.Router();
var db = require('../conf/db');
var com = require('../lib/com');
var sqls = require('../lib/sqls');
var dbQuery = db.dbQuery;
var moment = require('moment');

//允许post del的ip地址
let allowIp = [
    '183.134.110.210',
    '125.118.7.162',
    '115.204.89.166'
]

const format = 'YYYY-MM-DD HH:mm:ss';

router.use('/', (req, res, next) => {
    // if(req.session && req.session.loginUser) {
    //     next();
    // } else {
    //     com.sendJson(res, null, {
    //         message: '未登录哦，请先登录吧',
    //         result: 700
    //     })
    // }
    next();
})

router.post('/*', (req, res, next) => {
    let ip = req.headers.ip;
    console.log(`来访ip地址为:${ip}`);
    if (!~allowIp.indexOf(ip)) {
        com.sendJson(res, null, {
            message: '您不是本博客的管理员，只能预览博客后台不能做任何修改！',
            result: 300
        })
    } else {
        next();
    }
})
router.delete('/*', (req, res, next) => {
    let ip = req.headers.ip;
    console.log(`来访ip地址为:${ip}`);
    if (!~allowIp.indexOf(ip)) {
        com.sendJson(res, null, {
            message: '您不是本博客的管理员，只能预览博客后台不能做任何修改！',
            result: 300
        })
    } else {
        next();
    }
})

router.get('/user', (req, res) => {
    if (req.session && req.session.loginUser) {
        com.sendJson(res);
    }
})

router.get('/articlesRelief', (req, res) => {
    let pageNo = req.query.pageNo * 1 ? req.query.pageNo * 1 - 1 : 0;
	let pageSize = req.query.pageSize ? req.query.pageSize * 1 : 10;
	let p = [pageNo * pageSize, pageSize];
    db.pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(sqls.articles.articlesRelief, p,  (e, results, fields) => {
            let nlist = results.map(item => com.objectKeyToHump(item));
            com.sendJson(res, nlist);
            connection.release();
        })
    })
})

router.get('/article/:id', (req, res) => {
    db.pool.getConnection((err, connection) => {
        if (err) throw err;
        var { id } = req.params;
        connection.query('SELECT * FROM ?? WHERE ??=?', ['articles', 'id', id], (e, results, fields) => {
            let r = com.objectKeyToHump(results[0]);
            com.sendJson(res, r);
            connection.release();
        })
    })
})

router.post('/editArticle/:id', (req, res) => {
    let { id } = req.params;
    let { title, updated, content, tagIds, tagNames, cateIds, cateNames } = req.body;
    db.pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(sqls.articles.editArticleById, [title, new Date(updated), content, tagIds, tagNames, cateIds, cateNames, id], (e) => {
            if (e) throw e;
            com.sendJson(res);
            connection.release();
        })
    })
})

router.delete('/article/:id', (req, res) => {
    let { id } = req.params;
    db.pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(sqls.articles.deleteArticleById, id, (e) => {
            if (e) throw e;
            com.sendJson(res);
        })
    })
})

router.get('/tags', (req, res) => {
    dbQuery(sqls.tags.list + ';' + sqls.categories.list).then(results => {
        com.sendJson(res, {
            tags: results[0],
            categories: results[1]
        });
    }).catch(e => {
        console.log('tags--e:', e);
    })
})

router.post('/saveTag', (req, res) => {
    let { delTags, delCates } = req.body;
    let tags = JSON.parse(req.body.tags);
    let categories = JSON.parse(req.body.categories);
    let sqlTagInsert = sqls.tags.insert;
    let sqlTagDel = sqls.tags.delete;
    let sqlCateInsert = sqls.categories.insert;
    let sqlCateDel = sqls.categories.delete;
    let it = ic = '';
    let dt = dc = '(';

    for (let i = 0; i < tags.length; i++) {
        it += `("${tags[i].name}", "${moment().format(format)}")${(i + 1 == tags.length) ? '' : ','}`
    }
    for (let j = 0; j < categories.length; j++) {
        ic += `("${categories[j].name}", "${moment().format(format)}")${(j + 1 == categories.length) ? '' : ','}`
    }

    for (let i = 0; i < delTags.split(',').length; i++) {
        dt += Number(delTags.split(',')[i]) + ((i + 1) == delTags.split(',').length ? ')' : ',');
    }

    for (let j = 0; j < delCates.split(',').length; j++) {
        dc += Number(delCates.split(',')[j]) + ((j + 1) == delCates.split(',').length ? ')' : ',');
    }

    let fsql = '';
    if (it) {
        fsql += (sqlTagInsert + it) + ';'
    }
    if (ic) {
        fsql += (sqlCateInsert + ic) + ';'
    }
    if (delTags) {
        fsql += (sqlTagDel + dt) + ';'
    }
    if (delCates) {
        fsql += (sqlCateDel + dc);
    }
    console.log('sqlTagInsert + it:', sqlTagInsert + it);
    console.log('fsql:', fsql);
    dbQuery(fsql).then(() => {
        com.sendJson(res);
    }).catch(e => {
        console.log('e:', e);
    });
})

module.exports = router;
