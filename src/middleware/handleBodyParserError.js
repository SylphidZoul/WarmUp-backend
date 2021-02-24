const Response = require('../utils/response')

const handleBodyParserError = (err, _, res, next) => {
  if (err instanceof SyntaxError) {
    return Response.error(res, 'Invalid JSON body', 400, err)
  }
  next()
}

module.exports = handleBodyParserError
