const router = require('express').Router()

const asyncWrapper = require('../util/asyncWrapper')

// GET /api/subscriptions
router.get('/', asyncWrapper(async (req, res) => {

}))

// GET /api/subscriptions/:id
router.get('/:id', asyncWrapper(async (req, res) => {

}))

// POST /api/subscriptions
router.post('/', asyncWrapper(async (req, res) => {

}))

// DELETE /api/subscriptions/:id
router.delete('/:id', asyncWrapper(async (req, res) => {

}))

module.exports = router
