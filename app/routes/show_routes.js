const express = require('express')
const passport = require('passport')

const Show = require('../models/show')

// const handleErrors = require('../../lib/error_handler')
const customErrors = require('../../lib/custom_errors')
const requireOwnership = customErrors.requireOwnership
const handle404 = customErrors.handle404

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// GET /shows (index)
router.get('/shows', (req, res, next) => {
  Show.find()
    .then(shows => {
      return shows.map(show => show.toObject())
    })
    .then(shows => res.status(200).json({ shows: shows }))
    .catch(next)
})

// GET /shows/:id (show)
router.get('/shows/:id', (req, res, next) => {
  Show.findById(req.params.id)
    .then(handle404)
    .then(show => {
      res.status(200).json({ show: show.toObject() })
    })
    .catch(next)
})

// DELETE /shows/:id (destroy)
router.delete('/shows/:id', requireToken, (req, res, next) => {
  Show.findById(req.params.id)
    .then(handle404)
    .then(show => {
      requireOwnership(req, show)
      show.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// POST /shows (create)
router.post('/shows', requireToken, (req, res, next) => {
  req.body.show.owner = req.user.id

  Show.create(req.body.show)
    // .then(show => {
    //   return Show.populate(show, { path: 'owner', model: 'User' })
    // })
    .then(show => res.status(201).json({ show: show.toObject() }))
    .catch(next)
})

// 204 OPTION
// PATCH /shows/:id (update)
router.patch('/shows/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.show.owner

  Show.findById(req.params.id)
    .then(handle404)
    .then(show => {
      requireOwnership(req, show)

      return show.updateOne(req.body.show)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// 200 OPTION
// router.patch('/shows/:id', removeBlanks, (req, res, next) => {
//   delete req.body.show.owner
//   Show.findById(req.params.id)
//     .then(handle404)
//     .then(show => {
//       requireOwnership(req, show)
//       return show.set(req.body.show).save()
//     })
//     .then(show => res.status(200).json({ show: show.toObject() }))
//     .then(() => res.sendStatus(204))
//     .catch(next)
// })

module.exports = router
