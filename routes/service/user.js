var express = require('express')
var router = express.Router()
var daos = require('./daos')

router.get('/login', function (req, res, next) {
    daos.findUserByPhoneAndPassword(req.query.phone, req.query.password).then(response => {
        if (response.value.length > 0) {
            req.session.USERINFO = response.value[0]
            console.log(req.session.USERINFO)
            res.json({
                status: 1,
                message: '登陆成功',
                value: response.value[0]
            })
        } else {
            res.json({
                status: 0,
                message: '登陆失败'
            })
        }
    }, response => {
        res.json({
            status: 0,
            message: '登陆失败'
        })
    })
})

router.post('/register', function (req, res, next) {
    daos.findUserByPhone(req.body.phone).then(response => {
        if (response.value.length > 0) {
            res.json({
                status: 0,
                message: '手机号码已存在'
            })
        } else {
            return daos.saveUser(req.body.phone, req.body.password)
        }
    }, response => {
        res.json({
            status: 0,
            message: '注册失败'
        })
    }).catch(error => {
        res.json({
            status: 0,
            message: '注册失败'
        })
    }).then(response => {
        res.json({
            status: 1,
            message: '注册成功'
        })
    }, response => {
        res.json({
            status: 0,
            message: '注册失败'
        })
    }).catch(error => {
        res.json({
            status: 0,
            message: '注册失败'
        })
    })
})

router.get('/info', function (req, res, next) {
    daos.findUserById(req.query.id).then(response => {
        if (response.value.length > 0) {
            res.json({
                status: 1,
                message: '查询成功'
            })
        } else {
            res.json({
                status: 0,
                message: '查询失败'
            })
        }
    }, response => {
        res.json({
            status: 0,
            message: '查询失败'
        })
    })
})

router.post('/supervise', function (req, res, next) {
    daos.superviseUser(req.body.id, req.body.status).then(response => {
        res.json({
            status: 1,
            message: '操作成功'
        })
    }, response => {
        res.json({
            status: 0,
            message: '操作失败'
        })
    })
})

router.post('/logout', function (req, res, next) {
    delete req.session.USERINFO
    res.json({
        status: 1,
        message: '登出成功'
    })
})

module.exports = router
