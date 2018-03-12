module.exports = {
    comments: {
        queryByArticle: 'SELECT * FROM comments where article_id=?',
        postForArticle: 'INSERT INTO comments SET ?',
        queryById: 'SELECT * FROM comments where id=?',
        deleteById: 'DELETE FROM comments where id=?'
    },
    articles: {
        articlesRelief: 'SELECT id, title, created FROM articles'
    },
    login: {

    }
}