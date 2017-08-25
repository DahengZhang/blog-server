var express = require('express')
var router = express.Router()
var daos = require('./daos')

router.get('/find', function (req, res, next) {
    daos.findLabels().then(response => {
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
    daos.findLabelByName(req.body.name).then(response => {
        if (response.value.length > 0) {
            res.json({
                status: 0,
                message: '标签已存在'
            })
        } else {
            return daos.saveLabel(req.body.name)
        }
    }, response => {
        res.json({
            status: 0,
            message: '保存失败'
        })
    }).catch(error => {
        res.json({
            status: 0,
            message: '保存失败'
        })
    }).then(response => {
        res.json({
            status: 1,
            message: '保存成功'
        })
    }, response => {
        res.json({
            status: 0,
            message: '保存失败'
        })
    }).catch(error => {
        res.json({
            status: 0,
            message: '保存失败'
        })
    })
})

router.post('/remove', function (req, res, next) {
    daos.removeLabel(req.body.id).then(response => {
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
