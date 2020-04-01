const router = require('express').Router()

const asyncWrapper = require('../util/asyncWrapper')

// GET /api/plans
router.get('/', asyncWrapper(async (req, res) => {

}))

// GET /api/plans/:id
router.get('/:id', asyncWrapper(async (req, res) => {

}))

// POST /api/plans
router.post('/', asyncWrapper(async (req, res) => {

}))

// DELETE /api/plans/:id
router.delete('/:id', asyncWrapper(async (req, res) => {

}))

module.exports = router
