const fine = require('affineplane')
const almostEqual = fine.sphere3.almostEqual
const validate = fine.sphere3.validate

module.exports = function (actual, expected, message) {
  // Custom tape.js assertion.

  let isEqual = false
  if (expected.basis) {
    // Based
    isEqual = actual.basis === expected.basis
    isEqual = isEqual && validate(expected.sphere) && validate(actual.sphere)
    isEqual = isEqual && almostEqual(actual.sphere, expected.sphere)
  } else {
    // Raw
    isEqual = validate(expected) && validate(actual)
    isEqual = isEqual && almostEqual(actual, expected)
  }

  this._assert(isEqual, {
    message: message || 'sphere should have correct elements',
    operator: 'almostEqualSphere',
    actual,
    expected
  })
}
