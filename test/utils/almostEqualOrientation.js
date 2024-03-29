const fine = require('affineplane')
const almostEqual = fine.orient2.almostEqual
const validate = fine.orient2.validate

module.exports = function (actual, expected, message) {
  // Custom tape.js assertion.

  let isEqual = false
  if (expected.basis) {
    // Based
    isEqual = actual.basis === expected.basis
    isEqual = isEqual && validate(expected.orient) && validate(actual.orient)
    isEqual = isEqual && almostEqual(actual.orient, expected.orient)
  } else {
    // Raw
    isEqual = validate(expected) && validate(actual)
    isEqual = isEqual && almostEqual(actual, expected)
  }

  this._assert(isEqual, {
    message: message || 'orientation should have correct elements',
    operator: 'almostEqualOrientation',
    actual,
    expected
  })
}
