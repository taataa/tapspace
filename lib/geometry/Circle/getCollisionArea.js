const Area = require('../Area')
const circle2 = require('affineplane').circle2

module.exports = function (geom) {
  // @Circle:getCollisionArea(geometry)
  //
  // Compute overlapping area of the circle and the given geometry.
  // Note that not all geometries are supported, see below.
  //
  // Parameters:
  //   geometry
  //     a Point or Circle
  //
  // Return:
  //   an Area
  //

  if (geom.isPoint) {
    // Point collision is always zero regardless the point location.
    return new Area(this.basis, 0)
  }

  if (geom.isCircle) {
    // Transit circle
    const circle = geom.transitRaw(this.basis)
    // Compute intersection between circles
    const area = circle2.collisionArea(this.circle, circle)
    // To tensor
    return new Area(this.basis, area)
  }

  throw new Error('Unsupported geometry for collision detection')
}
