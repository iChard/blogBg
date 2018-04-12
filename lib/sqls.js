module.exports = {
    comments: {
        queryByArticle: 'SELECT * FROM comments where article_id=?',
        postForArticle: 'INSERT INTO comments SET ?',
        queryById: 'SELECT * FROM comments where id=?',
        deleteById: 'DELETE FROM comments where id=?'
    },
    articles: {
        articlesRelief: 'SELECT id, title, created FROM articles limit ?,?',
        deleteArticleById: 'DELETE FROM articles WHERE id=?',
        editArticleById: 'UPDATE articles SET title=?, updated=?, content=?, tag_ids=?, tag_names=?, cate_ids=?, cate_names=? WHERE id=?'
    },
    tags: {
        list: 'SELECT * FROM tags',
        insert: 'INSERT INTO tags (name, created) VALUES ',
        delete: 'DELETE FROM tags WHERE id in '
    }, 
    categories: {
        list: 'SELECT * FROM categories',
        insert: 'INSERT INTO categories (name, created) VALUES ',
        delete: 'DELETE FROM categories WHERE id in '
    },
    login: {

    }
}