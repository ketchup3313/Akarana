const Joi = require('@hapi/joi')

const regSchema = {
  username: Joi.string().required(),
  password: Joi.string().required(),
}

module.exports = {
  regSchema,
}
