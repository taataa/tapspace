const fine = require('affineplane')
const sphere3 = fine.sphere3

module.exports = function (geom) {
  // @Sphere:detectCollision(geometry)
  //
  // Check if the sphere collides with the given geometry.
  // Note that not all geometries are supported.
  //
  // Parameters:
  //   geometry
  //     a Point or Sphere
  //
  // Return:
  //   a boolean, true if collides
  //

  if (geom.isPoint) {
    // Transit point
    const point = geom.transitRaw(this.basis)
    // Collide
    return sphere3.hasPoint(this.sphere, point)
  }

  if (geom.isSphere) {
    // Transit sphere
    const sphere = geom.transitRaw(this.basis)
    // Collide
    return sphere3.collide(this.sphere, sphere)
  }

  throw new Error('Unsupported geometry for collision detection')
}
