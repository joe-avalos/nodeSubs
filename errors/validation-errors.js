module.exports = class ValidationError {
  constructor(message, model) {
    this.model = model
    this.message = message
  }
}
