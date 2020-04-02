const router = require('express').Router()

const asyncWrapper = require('../../util/asyncWrapper').AsyncWrapper
const SubscriptionsService = require('../services/subscriptions-service')
const validator = require('../../middleware/validator')

const subscriptionsService = new SubscriptionsService()

// GET /api/subscriptions
router.get('/', asyncWrapper(async (req, res) => {
  let userId = 1
  let subscriptions = await subscriptionsService.findAll(userId)
  res.send(subscriptions)
}))

// GET /api/subscriptions/:id
router.get('/:id', asyncWrapper(async (req, res) => {
  let id = req.params.id
  let userId = null
  let subscription = await subscriptionsService.findOne(id)
  res.send(subscription)
}))

// POST /api/subscriptions
router.post('/', [validator('Subscription')], asyncWrapper(async (req, res) => {
  let subscription = await subscriptionsService.create(req.body)
  res.send(subscription)
}))

// DELETE /api/subscriptions/:id
router.delete('/:id', asyncWrapper(async (req, res) => {
  let id = req.params.id
  let userId = null
  await subscriptionsService.deleteOne(id)
  res.sendStatus(200)
}))

module.exports = router
