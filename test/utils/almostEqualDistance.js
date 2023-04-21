const fine = require('affineplane')
const almostEqual = fine.dist3.almostEqual
const validate = fine.dist3.validate

module.exports = function (actual, expected, message) {
  // Custom tape.js assertion.

  let isEqual = false
  if (expected.basis) {
    // Based
    isEqual = actual.basis === expected.basis
    isEqual = isEqual && validate(expected.dist) && validate(actual.dist)
    isEqual = isEqual && almostEqual(actual.dist, expected.dist)
  } else {
    // Raw
    isEqual = validate(expected) && validate(actual)
    isEqual = isEqual && almostEqual(actual, expected)
  }

  this._assert(isEqual, {
    message: message || 'distance should almost equal',
    operator: 'almostEqualDistance',
    actual,
    expected
  })
}
