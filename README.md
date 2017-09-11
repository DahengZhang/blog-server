# Blog-Server

> 为本人另一个个人项目的服务端（GitHub地址:[https://github.com/DahengZhang/blog](https://github.com/DahengZhang/blog)）

> 觉得有学习参考价值的请给个star，我会一直对此项目进行更新，把我知道的技术融入其中。

## 技术栈

> Nodejs + Express + MongoDB + Mongoose + Session

## MongoDB安装与配置

> MongoDB 下载地址： [GitHub](https://github.com/mongodb/mongo) [官方下载地址](https://www.mongodb.com/download-center?jmp=nav#community)

> 我的数据库存放目录结构

> E - Mongodb

>   ├ data - db

>   └ logs

> 配置并写入服务中
> mongod.exe --logpath E:\Mongodb\logs\mongodb.log --logappend --dbpath E:\Mongodb\data\db --directoryperdb --serviceName MongoDB -install

## 功能

- [x] 文件上传功能（使用base64格式传输）
- [x] 用户登录
- [x] 用户注销
- [x] 用户注册
- [x] 查询用户信息
- [x] 启用/暂停用户账号
- [x] 添加文章标签
- [x] 查询文章标签
- [x] 移除文章标签
- [x] 分页查询文章
- [x] 通过ID查询文章详情
- [x] 发布文章
- [x] 删除文章
- [x] 针对某篇文章发表评论
- [x] 获取谋篇文章评论列表

## 待做功能

- [·] 文章点赞功能
- [·] 查询时根据文章点赞数量排序
- [·] 增加MySQL在项目中的使用
- [·] 新增关注用户功能
- [·] 新增文章下用户互相评论功能
