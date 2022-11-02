const fine = require('affineplane')
const vec3AlmostEqual = fine.vec3.almostEqual

module.exports = function (actual, expected, message) {
  // Custom tape.js assertion.
  this._assert(vec3AlmostEqual(actual, expected), {
    message: message || 'vector should have correct elements',
    operator: 'vectorEqual',
    actual,
    expected
  })
}
