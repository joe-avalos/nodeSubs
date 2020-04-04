const bcrypt = require('bcrypt')

module.exports = class PasswordHasher {
  constructor() {
    this.rounds = 10
  }
  
  async hash(password){
    return await bcrypt.hash(password, this.rounds)
  }
  
  async compare(password, hash){
    return await bcrypt.compare(password, hash)
  }
}
