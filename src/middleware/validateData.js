const Response = require('../utils/response')

const generateErrorMessage = (failedInput) => {
  switch (failedInput) {
    case 'id':
      return 'The id must be an integer number greater than 0.'
    case 'title':
      return 'The title must be alphanumeric with !?/() between 1 and 95 characters.'
    case 'content':
      return 'The content must be string and cannot be longer than 65500 characters.'
    case 'image':
      return 'The image url must ends in (.png|.jpg|.jpeg|.gif) and cannot be longer than 1000 characters.'
    case 'categoryId':
      return 'The category id must be an integer number greater than 0.'
    default:
      return `The ${failedInput} is not valid or not allowed.`
  }
}

const validateData = (schema, check = 'body') => (req, res, next) => {
  const { error } = schema.validate(req[check])
  error
    ? Response.error(res, generateErrorMessage(error.details[0].path[0]), 400, error)
    : next()
}

module.exports = validateData
