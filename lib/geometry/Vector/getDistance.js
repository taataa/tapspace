const vec3 = require('affineplane').vec3
const Distance = require('../Distance')

module.exports = function () {
  // tapspace.geometry.Vector:getDistance()
  // tapspace.geometry.Vector:norm
  //
  // Get vector norm as a Distance.
  //
  // Return
  //   a Distance
  //
  const magn = vec3.norm(this)
  return new Distance(this.basis, magn)
}
