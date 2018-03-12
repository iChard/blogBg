var express = require('express');
var router = express.Router();
var db = require('../conf/db');
var com = require('../lib/com');

var comments = require('./comment');
var login = require('./login');
var admin = require('./admin');


// router.get('/', )

/* GET home page. */
router.use('/', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
	res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS');
	next();
})

router.use('/account', login);
router.use('/comments', comments);
router.use('/admin', admin);

let queryArticleWithComments = (res, connection, article) => {
	connection.query('SELECT * FROM comments where article_id = ? ', [article.id], (e, results, fields) => {
		let nlist = results.map(item => com.objectKeyToHump(item));
		com.sendJson(res, Object.assign({}, article, {comments: nlist.reverse()}));
		connection.release();
	})
}

router.post('/saveArticle', function(req, res) {
	let reqData = req.body;
	db.pool.getConnection((err, connection) => {
		if(err) throw err;
		var sql = 'INSERT INTO articles SET ?';
		connection.query(sql, Object.assign({}, reqData, {created: new Date(Number(reqData.created))}), (error, results, fields) => {
			if(error) throw error;
			console.log('文章保存成功');
			com.sendJson(res);
			connection.release();
		})
	})
})

router.get('/articles', (req, res) => {
	db.pool.getConnection((err, connection) => {
		connection.query('SELECT * FROM articles ORDER BY created DESC', (e, results, fields) => {
			com.sendJson(res, {articles: results});
			connection.release();
		})
	})
})

router.get('/article/:id', (req, res) => {
	db.pool.getConnection((err, connection) => {
		if(err) throw err;
		var {id} = req.params;
		connection.query('SELECT * FROM ?? WHERE ??=?', ['articles', 'id', id], (e, results, fields) => {
			queryArticleWithComments(res, connection, results[0])
		})		
	})
})


module.exports = router;
