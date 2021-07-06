const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request. body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).append('error', 'unknown endpoint').send()
}

//needed so that middleware handles errors
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).append('error', 'malformatted id').send()
  } else if (error.name === 'ValidationError') {
    return response.status(400).append('error', error.message).send()
  }else if(error.name === 'TypeError'){
    return response.status(404).append('error', 'Not found').send()
  }else{
    return response.status(400).append('error', 'bad request').send()
  }
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    request.token = authorization.substring(7)
  }

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}
