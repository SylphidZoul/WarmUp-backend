const Joi = require('joi')

const TITLE = Joi.string().pattern(/^[a-zA-Z0-9 !?/()]{1,95}$/)
const CONTENT = Joi.string().max(65500)
const IMAGE = Joi.string().pattern(/https?:\/\/.*\.(?:png|jpg|gif|jpeg)/i).max(999)
const INTEGER_POSITIVE = Joi.number().positive().greater(0).integer()

const idParam = Joi.object({
  id: INTEGER_POSITIVE
})

const createBody = Joi.object({
  title: TITLE.required(),
  content: CONTENT.required(),
  image: IMAGE.required(),
  categoryId: INTEGER_POSITIVE.required()
})

const updateBody = Joi.object({
  title: TITLE,
  content: CONTENT,
  image: IMAGE,
  categoryId: INTEGER_POSITIVE
}).min(1)

module.exports = {
  idParam,
  createBody,
  updateBody
}
