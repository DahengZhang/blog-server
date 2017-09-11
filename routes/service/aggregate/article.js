var mongoose = require('mongoose')

var article = mongoose.model('article', new mongoose.Schema({
  title: String,
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
  content: String,
  labels: {
    type: [{
      id: String,
      name: String
    }],
    default: []
  },
  like: {
    type: Number,
    default: 0
  },
  dislike: {
    type: Number,
    default: 0
  },
  collections: {
    type: Number,
    default: 0
  },
  report: {
    type: Number,
    default: 0
  },
  read: {
    type: Number,
    default: 0
  },
  comment: {
    type: Number,
    default: 0
  },
  images: {
    type: Array,
    default: []
  }
}))

module.exports = article
