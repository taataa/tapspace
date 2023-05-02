const fine = require('affineplane')
const almostEqual = fine.point3.almostEqual
const validate = fine.point3.validate

module.exports = function (actual, expected, message) {
  // Custom tape.js assertion.

  let isEqual = false
  if (expected.basis) {
    // Based
    isEqual = actual.basis === expected.basis
    isEqual = isEqual && validate(expected.point) && validate(actual.point)
    isEqual = isEqual && almostEqual(actual.point, expected.point)
  } else {
    // Raw
    isEqual = validate(expected) && validate(actual)
    isEqual = isEqual && almostEqual(actual, expected)
  }

  this._assert(isEqual, {
    message: message || 'point should have correct elements',
    operator: 'almostEqualPoint',
    actual,
    expected
  })
}
