var mongoose = require('mongoose')

var label = mongoose.model('label', new mongoose.Schema({
    name: String
}))

module.exports = label
