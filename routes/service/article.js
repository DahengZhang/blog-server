var express = require('express')
var router = express.Router()
var daos = require('./daos')

router.get('/find', function (req, res, next) {
    daos.findArticles(req.query.pageNumber, req.query.pageSize).then(response => {
        res.json({
            status: 1,
            message: '查询成功',
            value: response.value
        })
    }, response => {
        res.json({
            status: 0,
            message: '查询失败'
        })
    })
})

router.get('/findById', function (req, res, next) {
    daos.findArticleById(req.query.id).then(response => {
        daos.readArticle(req.query.id)
        res.json({
            status: 1,
            message: '查询成功',
            value: response.value[0]
        })
    }).catch(response => {
        res.json({
            status: 0,
            message: '查询失败'
        })
    })
})

router.post('/read', function (req, res, next) {
    daos.readArticle(req.query.id).then(response => {
        res.json({
            status: 1,
            message: '操作成功'
        })
    }).catch(response => {
        res.json({
            status: 0,
            message: '操作失败'
        })
    })
})

router.post('/save', function (req, res, next) {
    if (req.session.USERINFO) {
        var author = {
            id: req.session.USERINFO._id,
            name: req.session.USERINFO.name,
            picture: req.session.USERINFO.picture
        }
    } else if (req.body.author) {
        var author = {
            id: req.body.author._id,
            name: req.body.author.name,
            picture: req.body.author.picture
        }
    } else {
        res.json({
            status: 0,
            message: '用户身份认证失败'
        })
        return
    }
    daos.saveArticle(req.body.title, author, req.body.content, req.body.labels, req.body.images).then(response => {
        res.json({
            status: 1,
            message: '发布成功'
        })
    }, response => {
        res.json({
            status: 0,
            message: '发布失败'
        })
    })
})

router.post('/remove', function (req, res, next) {
    daos.removeArticle(req.body.id).then(response => {
        res.json({
            status: 1,
            message: '删除成功'
        })
    }, response => {
        res.json({
            status: 0,
            message: '删除失败'
        })
    })
})

router.get('/comment', function (req, res, next) {
    daos.findAllComment(req.query.articleId).then(response => {
        res.json({
            status: 1,
            message: '查询成功',
            value: response.value
        })
    }, response => {
        res.json({
            status: 0,
            message: '查询失败'
        })
    })
})

router.post('/comment', function (req, res, next) {
    if (req.session.USERINFO) {
        var author = {
            id: req.session.USERINFO._id,
            name: req.session.USERINFO.name,
            picture: req.session.USERINFO.picture
        }
    } else if (req.body.author) {
        var author = {
            id: req.body.author._id,
            name: req.body.author.name,
            picture: req.body.author.picture
        }
    } else {
        res.json({
            status: 0,
            message: '用户身份认证失败'
        })
        return
    }
    daos.saveComment(req.body.articleId, author, req.body.content).then(response => {
        return daos.findAllComment(req.body.articleId)
    }).then(response => {
        res.json({
            status: 1,
            message: '发布成功',
            value: response.value
        })
    }).catch(error => {
        res.json({
            status: 0,
            message: '发布失败'
        })
    })
})

module.exports = router
