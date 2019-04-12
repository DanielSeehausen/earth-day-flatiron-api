const config = require('../../config.js')
const validColor = require('./reqValidators/validColor.js')
const validTile = require('./reqValidators/validTile.js')

/* this is strictly for validating routes that have specific parameter
 * requirements. If a request url isn't present here, it doesn't mean 404
 * instead, it means it doesn't require any special validation
 */

const routeValidators = {
  POST: {
    '/tile': [validTile, validColor],
    __noSuchMethod__: [() => true] // might be 404 but that is handled normally.
  },
  GET: {
    '/board': [() => true],
    '/tile': [validTile],
    __noSuchMethod__: [() => true] // might be 404 but that is handled normally.
  }
}

function validRequest(req, res, next) {
  const validators = routeValidators[req.method][req.path]
  if (!validators.every(validator => validator(req))) {
    const invalids = validators.filter(validator => !validator(req)) // finds the validation methods that failed
    return res.status(422).send('Bad Request! Check your coordinates, color value, etc.')
  }
  next()
}

module.exports = validRequest
