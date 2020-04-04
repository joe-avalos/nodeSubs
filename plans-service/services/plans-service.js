const Plan = require('../models')['Plan']
const CachingService = require('./caching-service')

module.exports = class PlansService {
  constructor() {
    this.cachingService = new CachingService({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
    })
  }
  
  async findAll(userId) {
    let plans = await this.cachingService.getPlans(userId)
    if (plans) {
      return plans
    } else {
      let plans = await Plan.findAll({where: {userId}})
      await this.cachingService.storePlans(plans, userId)
      return plans
    }
  }
  
  async findOne(id) {
    return await Plan.findOne({where: {id}})
  }
  
  async create(plan) {
    await this.cachingService.purgeCache(plan.userId)
    return Plan.create(plan)
  }
  
  async deleteOne(id) {
    let plan = await this.findOne(id)
    if (plan){
      await this.cachingService.purgeCache(plan.userId)
      return await Plan.destroy({where: {id}})
    }else{
      return Promise.resolve()
    }
  }
}
