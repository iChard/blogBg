# 基于React的个人博客之后端

> 这是一个前后端分离的博客系统，还在完善中，目前实现了前端页面的文章渲染、详情、评论、管理员登录、创建文章、编辑文章等接口和界面交互
> 有需要的话可以根据以下步骤运行测试（建议配合当前系列的前端项目）

## 依赖环境

mac10.12.6、node7.6.0、先根据下面的数据库方案建好表结构

## 步骤（这里介绍的是配合后端项目一起）

- 首先打开前端项目https://github.com/iChard/blogFe

1. npm i安装依赖
2. npm start  这时候启动的是localhost:3000

- 然后前端https://github.com/iChard/blogBg

1. npm i
2. npm start 会提示你端口号被占用
3. 选择y即可
4. 然后启动的是localhost:3001服务

正常的话前后端项目都会在本地运行起来，为了让让前端3001端口号访问后端3000端口上的接口可通过以下方式：

1. 设置本地host，随机选一个域名指向你的本地如： `127.0.0.1 www.ichard.cn`
2. 开启nginx并在server里面加上以下设置
3. reload nginx让nginx生效

```nginx
    server {
        listen 8080;
        charset utf-8;
        server_name www.ichard.cn;
        root /;
        index index.html;
        location ~* \.(js|jpg|css|html|png|svg|json|ico)$ {
            proxy_pass http://127.0.0.1:3001;
        }
        location / {
            proxy_set_header Host $http_host;
            proxy_pass http://127.0.0.1:3001;
        }
        location /api/ {
            proxy_pass http://127.0.0.1:3000;
        }
    }
```

## mysql数据库

数据库名称
test

包含表

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fqfxesh2acj30mm05m3yt.jpg)

表结构

```sql
# account表
CREATE TABLE `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COMMENT='测试表';

# articles表
CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text,
  `created` datetime DEFAULT NULL,
  `tag_names` varchar(1024) DEFAULT NULL,
  `cate_names` varchar(1024) DEFAULT NULL,
  `title` varchar(1024) DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `tag_ids` varchar(1024) DEFAULT NULL,
  `cate_ids` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4;

# categories表
CREATE TABLE `categories` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4;

# tags表
CREATE TABLE `tags` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4;

```
