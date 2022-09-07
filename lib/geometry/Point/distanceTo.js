const point3 = require('affineplane').point3
const Distance = require('../Distance')

module.exports = function (p) {
  // tapspace.geometry.Point:distanceTo(p)
  //
  // Distance between points.
  //
  // Parameters:
  //   p
  //     a Point or {x,y,z}. The latter is assumed to be on the same basis.
  //
  // Return
  //   a Distance
  //

  // Normalize
  if (p.basis) {
    const pr = p.basis.getTransitionTo(this.basis)
    p = point3.transitFrom(p, pr)
  }

  const dx = p.x - this.x
  const dy = p.y - this.y
  const dz = p.z - this.z
  const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

  return new Distance(this.basis, dist)
}
