const router = require('express').Router()

const asyncWrapper = require('../../util/asyncWrapper').AsyncWrapper
const UsersService = require('../services/users-service')
const validator = require('../../middleware/validator')
const AuthenticationError = require('../../errors/authentication-errors')

const userService = new UsersService()

router.post('/sign-up', [validator('User')], asyncWrapper(async (req, res) => {
  let token = await userService.create(req.body)
  res.send(token)
}))

router.post('/sign-in', [validator('User', 'login')], asyncWrapper(async (req, res) => {
  let {email, password} = req.body
  let token = await userService.singIn(email, password)
  if (!token) throw new AuthenticationError('Invalid credentials')
  
  res.send(token)
}))

module.exports = router
