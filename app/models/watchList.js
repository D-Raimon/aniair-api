const mongoose = require('mongoose')
require('./user')

const watchlistSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  airDay: {
    type: String,
    required: true
  },
  showId: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

const Watchlist = mongoose.model('Watchlist', watchlistSchema)

module.exports = Watchlist
