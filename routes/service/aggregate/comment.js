var mongoose = require('mongoose')

var comment = mongoose.model('comment', new mongoose.Schema({
  article: String,
  time: {
    type: Date,
    default: Date.now
  },
  author: {
    type: {
      id: String,
      name: String,
      picture: {
        type: String,
        default: ''
      }
    }
  },
  content: String
}))

module.exports = comment
