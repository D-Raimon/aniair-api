const express = require('express')
const passport = require('passport')

const Watchlist = require('../models/book')

const requireToken = passport.authenticate('bearer', { session: false })

const removeBlanks = require('../../lib/remove_blank_fields')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const router = express.Router()

// GET /watchlist (index)
router.get('/watchlist', requireToken, (req, res, next) => {
  Watchlist.find({ owner: req.user._id })
    .populate('owner')
    .then(watchlist => {
      return watchlist.map(watchlist => watchlist.toObject())
    })
    .then(watchlist => res.status(200).json({ watchlist: watchlist }))
    .catch(next)
})

// GET /watchlist/:id (show)
router.get('/watchlist/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  Watchlist.findById(id)
    .populate('owner')
    .then(handle404)
    .then(watchlist => {
      requireOwnership(req, watchlist)
      res.status(200).json({ watchlist: watchlist.toObject() })
    })
    .catch(next)
})

// DELETE /watchlist/:id (destroy)
router.delete('/watchlist/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  Watchlist.findById(id)
    .then(handle404)
    .then(watchlist => {
      requireOwnership(req, watchlist)
      watchlist.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// POST /watchlist (create)
router.post('/watchlist', requireToken, (req, res, next) => {
  const watchlist = req.body.watchlist
  watchlist.owner = req.user._id
  Watchlist.create(watchlist)
    .then(watchlist => {
      return Watchlist.populate(watchlist, { path: 'owner', model: 'User' })
    })
    .then(watchlist => res.status(201).json({ watchlist: watchlist.toObject() }))
    .catch(next)
})

// PATCH /watchlist/:id (update)
// 204 option: Returns no content
// router.patch('/watchlist/:id', requireToken, removeBlanks, (req, res, next) => {
//   delete req.body.watchlist.owner
//   Watchlist.findById(req.params.id)
//     .then(handle404)
//     .then(watchlist => {
//       requireOwnership(req, watchlist)
//       return watchlist.update(req.body.book)
//     })
//     .then(() => res.sendStatus(204))
//     .catch(next)
// })

// PATCH /watchlist/:id (update)
// 200 option: Returns the updated resource
// Helpful if you need the updated timestamp or a virtual
router.patch('/watchlist/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.watchlist.owner

  Watchlist.findById(req.params.id)
    .then(handle404)
    .then(watchlist => {
      requireOwnership(req, watchlist)
      return watchlist.set(req.body.watchlist).save()
    })
    .then(watchlist => res.status(200).json({ watchlist: watchlist.toObject() }))
    .catch(next)
})

module.exports = router
