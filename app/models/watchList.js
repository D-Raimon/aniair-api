const mongoose = require('mongoose')
require('./user')

const watchlistSchema = mongoose.Schema({
  sunday: {
    type: Array,
    required: false
  },
  monday: {
    type: Array,
    required: false
  },
  tuesday: {
    type: Array,
    required: false
  },
  wednesday: {
    type: Array,
    required: false
  },
  thursday: {
    type: Array,
    required: false
  },
  friday: {
    type: Array,
    required: false
  },
  saturday: {
    type: Array,
    required: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

const Watchlist = mongoose.model('ShowUpload', watchlistSchema)

module.exports = Watchlist
