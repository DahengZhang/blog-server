var mongoose = require('mongoose')

var user = mongoose.model('user', new mongoose.Schema({
    name: String,
    phone: Number,
    picture: {
        type: String,
        default: ''
    },
    birthday: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String,
        default: '保密'
    },
    password: String,
    status: {
        type: Boolean,
        default: true
    }
}))

module.exports = user
