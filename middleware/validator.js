const Joi = require('joi')
const Subscription = require('../subscriptions-service/models/subscription')
const Plan = require('../plans-service/models/plan')
const User = require('../auth-service/models/user')
const ValidationError = require('../errors/validation-errors')

'use strict'

let validators = {
  'Subscription': {
    scopes: {
      default: Subscription.SubscriptionValidationSchema,
    },
  },
  'Plan': {
    scopes: {
      default: Plan.PlanValidationSchema,
    },
  },
  'User': {
    scopes: {
      default: User.UserValidationSchema,
      login: User.LoginValidationSchema,
    }
  }
}

// scopeExists(validators.Subscription, 'default') --> true
// scopeExists(validators.Subscription, 'update') --> false
function scopeExists(validator, scope) {
  return Object.keys(validator.scopes).find(key => key === scope) !== undefined
}

function getSchema(model, scope) {
  let validator = validators[model]
  if (!validator) throw new Error('Validator does not exists!')
  
  // Check if validator has multiple scopes
  if (validator.scopes) {
    if (scope) {
      if (!scopeExists(validator, scope)) {
        throw new Error(`Scope ${scope} does not exist in model ${model} validator`)
      }else{
        return validator.scopes[scope]
      }
    } else {
      return validator.scopes.default
    }
  } else {
    return validator
  }
}

function validate(model, object, scope) {
  return Joi.validate(object, getSchema(model, scope), {
    allowUnknown: true
  })
}

// Actual middleware factory
module.exports = function ValidationMiddleware(model, scope) {
  return (req, res, next) => {
    const validationResult = validate(model, req.body, scope)
    if (validationResult.error) {
      throw new ValidationError(validationResult.error.message, model)
    }else{
      next()
    }
  }
}
