const router = require('express').Router()

const asyncWrapper = require('../../util/asyncWrapper').AsyncWrapper
const PlansService = require('../services/plans-service')
const validator = require('../../middleware/validator')
const protectedRoute = require('../../middleware/protected-route')

const plansService = new PlansService()

router.use(protectedRoute())

// GET /api/plans
router.get('/', asyncWrapper(async (req, res) => {
  let userId = req.user
  let plans = await plansService.findAll(userId)
  res.send(plans)
}))

// GET /api/plans/:id
router.get('/:id', asyncWrapper(async (req, res) => {
  let id = req.params.id
  let userId = null
  let plan = await plansService.findOne(id)
  res.send(plan)
}))

// POST /api/plans
router.post('/', [validator('Plan')], asyncWrapper(async (req, res) => {
  let plan = req.body
  plan.userId = req.user
  plan = await plansService.create(plan)
  res.send(plan)
}))

// DELETE /api/plans/:id
router.delete('/:id', asyncWrapper(async (req, res) => {
  let id = req.params.id
  let userId = null
  await plansService.deleteOne(id)
  res.sendStatus(200)
}))

module.exports = router
