const fine = require('affineplane')
const almostEqual = fine.box3.almostEqual
const validate = fine.box3.validate

module.exports = function (actual, expected, message) {
  // Custom tape.js assertion.

  let isEqual = false
  if (expected.basis) {
    // Based
    isEqual = actual.basis === expected.basis
    isEqual = isEqual && validate(expected.box) && validate(actual.box)
    isEqual = isEqual && almostEqual(actual.box, expected.box)
  } else {
    // Raw
    isEqual = validate(expected) && validate(actual)
    isEqual = isEqual && almostEqual(actual, expected)
  }

  this._assert(isEqual, {
    message: message || 'box should have correct elements',
    operator: 'almostEqualBox',
    actual,
    expected
  })
}
