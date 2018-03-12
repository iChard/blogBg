module.exports = {
    created: new Date(),
    content: `
        ## app.use
        ### middleware是指收到请求后和发送相应前这个阶段内的一段函数
        ### app.use([path,]function)
        > 为指定的路径绑定执行函数，如果path没有指定，则默认绑定到'/'
        > 路由会匹配任何以"/"紧跟其后的path路径，比如app.use('/apple',...)会匹配'/apple','/apple/images','/apple/images/news'等等
    `,
    tags: 'javascript,express,node',
    category: '技术'
}
