const fine = require('affineplane')
const almostEqual = fine.dist3.almostEqual

module.exports = function (actual, expected, message) {
  // Custom tape.js assertion.

  const isEqual = almostEqual(actual, expected)

  this._assert(isEqual, {
    message: message || 'numbers should be almost equal',
    operator: 'almostEqual',
    actual,
    expected
  })
}
