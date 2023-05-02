const fine = require('affineplane')
const almostEqual = fine.dir3.almostEqual
const validate = fine.dir3.validate

module.exports = function (actual, expected, message) {
  // Custom tape.js assertion.

  let isEqual = false
  if (expected.basis) {
    // Based
    isEqual = actual.basis === expected.basis
    isEqual = isEqual && validate(expected.dir) && validate(actual.dir)
    isEqual = isEqual && almostEqual(actual.dir, expected.dir)
  } else {
    // Raw
    isEqual = validate(expected) && validate(actual)
    isEqual = isEqual && almostEqual(actual, expected)
  }

  this._assert(isEqual, {
    message: message || 'direction should almost equal',
    operator: 'almostEqualDirection',
    actual,
    expected
  })
}
