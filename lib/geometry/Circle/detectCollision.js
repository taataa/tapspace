const fine = require('affineplane')
const circle2 = fine.circle2

module.exports = function (geom) {
  // @Circle:detectCollision(geometry)
  //
  // Check if the circle collides with the given geometry.
  // The collision check does not consider z coordinates.
  // Note that not all geometries are supported, see below.
  //
  // Parameters:
  //   geometry
  //     a Point or Circle
  //
  // Return:
  //   a boolean, true if collides
  //

  if (geom.isPoint) {
    // Transit point
    const point = geom.transitRaw(this.basis)
    // Collide
    return circle2.hasPoint(this.circle, point)
  }

  if (geom.isCircle) {
    // Transit circle
    const circle = geom.transitRaw(this.basis)
    // Collide
    return circle2.collide(this.circle, circle)
  }

  throw new Error('Unsupported geometry for collision detection')
}
