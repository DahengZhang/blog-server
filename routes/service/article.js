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

router.post('/save', function (req, res, next) {
    var author = {
        id: 0,
        name: 'Admin'
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

module.exports = router
