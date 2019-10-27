const mongoose = require('mongoose')

const showUploadSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  airDay: {
    type: String,
    required: true
  },
  numOfEps: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  longDescription: {
    type: String,
    required: false
  },
  trailer: {
    type: String,
    required: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

const ShowUpload = mongoose.model('ShowUpload', showUploadSchema)

module.exports = ShowUpload
