const fine = require('affineplane')
const almostEqual = fine.vec3.almostEqual
const validate = fine.vec3.validate

module.exports = function (actual, expected, message) {
  // Custom tape.js assertion.

  let isEqual = false
  if (expected.basis) {
    // Based
    isEqual = actual.basis === expected.basis
    isEqual = isEqual && validate(expected.vec) && validate(actual.vec)
    isEqual = isEqual && almostEqual(actual.vec, expected.vec)
  } else {
    // Raw
    isEqual = validate(expected) && validate(actual)
    isEqual = isEqual && almostEqual(actual, expected)
  }

  this._assert(isEqual, {
    message: message || 'vector should have correct elements',
    operator: 'almostEqualVector',
    actual,
    expected
  })
}
