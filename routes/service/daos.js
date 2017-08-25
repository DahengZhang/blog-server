var user = require('./aggregate/user')
var label = require('./aggregate/label')
var article = require('./aggregate/article')

var daos = {
    findUserByPhoneAndPassword(phone, password) {
        return new Promise((resolve, reject) => {
            user.find({ phone: phone, password: password }, (error, value) => {
                if (error) {
                    reject({
                        status: 0,
                        message: '操作失败'
                    })
                }
                resolve({
                    status: 1,
                    message: '查询成功',
                    value: value
                })
            })
        })
    },
    findUserById(id) {
        return new Promise((resolve, reject) => {
            user.find({ _id: id }, (error, value) => {
                if (error) {
                    reject({
                        status: 0,
                        message: '操作失败'
                    })
                }
                resolve({
                    status: 1,
                    message: '查询成功',
                    value: value
                })
            })
        })
    },
    findUserByPhone(phone) {
        return new Promise((resolve, reject) => {
            user.find({ phone: phone }, (error, value) => {
                if (error) {
                    reject({
                        status: 0,
                        message: '操作失败'
                    })
                }
                resolve({
                    status: 1,
                    message: '查询成功',
                    value: value
                })
            })
        })
    },
    findUserByName(name) {
        return new Promise((resolve, reject) => {
            user.find({ name: name }, (error, value) => {
                if (error) {
                    reject({
                        status: 0,
                        message: '操作失败'
                    })
                }
                resolve({
                    status: 1,
                    message: '查询成功',
                    value: value
                })
            })
        })
    },
    saveUser(phone, password) {
        var newUser = new user({
            phone: phone,
            password: password
        })
        return new Promise((resolve, reject) => {
            newUser.save(error => {
                if (error) {
                    reject({
                        status: 0,
                        message: '操作失败'
                    })
                }
                resolve({
                    status: 1,
                    message: '保存成功'
                })
            })
        })
    },
    superviseUser(id, status) {
        return new Promise((resolve, reject) => {
            user.update({ _id: id }, { $set: { status: status } }, error => {
                if (error) {
                    reject({
                        status: 0,
                        message: '操作失败'
                    })
                }
                resolve({
                    status: 1,
                    message: '操作成功'
                })
            })
        })
    },
    findLabels() {
        return new Promise((resolve, reject) => {
            label.find({}, (error, value) => {
                if (error) {
                    reject({
                        status: 0,
                        message: '操作失败'
                    })
                }
                resolve({
                    status: 1,
                    message: '查询成功',
                    value: value
                })
            })
        })
    },
    findLabelByName(labelName) {
        return new Promise((resolve, reject) => {
            label.find({ 'name': labelName }, (error, value) => {
                if (error) {
                    reject({
                        status: 0,
                        message: '操作失败'
                    })
                }
                resolve({
                    status: 1,
                    message: '查询成功',
                    value: value
                })
            })
        })
    },
    saveLabel(labelName) {
        var newLabel = new label({
            name: labelName
        })
        return new Promise((resolve, reject) => {
            newLabel.save(error => {
                if (error) {
                    reject({
                        status: 0,
                        message: '操作失败'
                    })
                }
                resolve({
                    status: 1,
                    message: '保存成功'
                })
            })
        })
    },
    removeLabel(id) {
        return new Promise((resolve, reject) => {
            label.remove({ _id: id }, error => {
                if (error) {
                    reject({
                        status: 0,
                        message: '操作失败'
                    })
                }
                resolve({
                    status: 1,
                    message: '删除成功'
                })
            })
        })
    },
    findArticles(pageNumber=1, pageSize=2) {
        return new Promise((resolve, reject) => {
            article.find({}, {}, {limit: pageSize-0}, (error, value) => {
                if (error) {
                    reject({
                        status: 0,
                        message: '操作失败'
                    })
                }
                resolve({
                    status: 1,
                    message: '查询成功',
                    value: value
                })
            }).skip((pageNumber-1)*pageSize)
        })
    },
    findArticleById(id) {
        return new Promise((resolve, reject) => {
            article.find({ _id: id }, (error, value) => {
                if (error) {
                    reject({
                        status: 0,
                        message: '操作失败'
                    })
                }
                resolve({
                    status: 1,
                    message: '查询成功',
                    value: value
                })
            })
        })
    },
    saveArticle(title, author, content, labels, images) {
        if (images) {
            var image = images
        }
        if (labels) {
            var label = JSON.parse(labels)
        }
        var newArticle = new article({
            title: title,
            author: author,
            content: content,
            images: image,
            labels: label
        })
        return new Promise((resolve, reject) => {
            newArticle.save(error => {
                if (error) {
                    reject({
                        status: 0,
                        message: '操作失败'
                    })
                }
                resolve({
                    status: 1,
                    message: '保存成功'
                })
            })
        })
    },
    removeArticle(id) {
        return new Promise((resolve, reject) => {
            article.remove({ _id: id }, error => {
                if (error) {
                    reject({
                        status: 0,
                        message: '操作失败'
                    })
                }
                resolve({
                    status: 1,
                    message: '删除成功'
                })
            })
        })
    }
}

module.exports = daos
