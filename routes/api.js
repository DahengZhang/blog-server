var express = require('express')
var fs = require('fs')
var router = express.Router()
var user = require('./service/user')
var label = require('./service/label')
var article = require('./service/article')

router.use('/user', user)
router.use('/label', label)
router.use('/article', article)

router.post('/upload', function (req, res, next) {
    var images = []
    var nowFileIndex = 0
    var errorPictureNumber = 0
    var imagesUrl = []
    var file = ''
    var fileName = ''
    for (var f of req.body.images) {
        var base64Data = ''
        var fileType = f.substring(0, f.indexOf(",") + 1)
        if (fileType == 'data:image/png;base64,') {
            base64Data = f.toString().replace(/^data:image\/png;base64,/, "")
        } else if (fileType == 'data:image/jpeg;base64,') {
            base64Data = f.toString().replace(/^data:image\/jpeg;base64,/, "")
        } else {
            res.json({
                status: 0,
                message: '仅支持jpeg与png格式图片'
            })
            return
        }
        images.push(base64Data)
    }
    if (images.length > 0) {
        saveFile()
    } else {
        res.json({
            status: 0,
            message: '未发现图片'
        })
        return
    }
    function saveFile() {
        console.log(images)
        if (nowFileIndex < images.length) {
            var fileName = guid()
            fs.writeFile("uploads/" + fileName, images[nowFileIndex++], 'base64', function (error) {
                if (error) {
                    console.log(error)
                    errorPictureNumber++
                } else {
                    imagesUrl.push(fileName)
                }
                saveFile()
            })
        } else {
            res.json({
                status: 0,
                message: '上传完成, ' + errorPictureNumber + ' 张失败',
                imagesUrl: imagesUrl
            })
        }
    }
    function guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
})

module.exports = router
