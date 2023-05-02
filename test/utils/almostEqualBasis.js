const fine = require('affineplane')
const almostEqual = fine.plane3.almostEqual
const validate = fine.plane3.validate

module.exports = function (actual, expected, message) {
  // Custom tape.js assertion.

  let isEqual = false
  if (expected.basis) {
    // Based
    isEqual = actual.basis === expected.basis
    isEqual = isEqual && validate(expected.tran) && validate(actual.tran)
    isEqual = isEqual && almostEqual(actual.tran, expected.tran)
  } else {
    // Raw
    isEqual = validate(expected) && validate(actual)
    isEqual = isEqual && almostEqual(actual, expected)
  }

  this._assert(isEqual, {
    message: message || 'basis should have correct elements',
    operator: 'almostEqualBasis',
    actual,
    expected
  })
}
