const fine = require('affineplane')
const box3 = fine.box3

module.exports = function (geom) {
  // @Box:detectCollision(geometry)
  //
  // Check if the box collides with the given geometry.
  // Note that not all geometries are supported, see below.
  //
  // Parameters:
  //   geometry
  //     a Point or Box
  //
  // Return:
  //   a boolean, true if collides
  //

  if (geom.isPoint) {
    // Transit point
    const point = geom.transitRaw(this.basis)
    // Collide
    return box3.hasPoint(this.box, point)
  }

  if (geom.isBox) {
    // Transit box
    const box = geom.transitRaw(this.basis)
    // Collide
    return box3.collide(this.box, box)
  }

  throw new Error('Unsupported geometry for collision detection')
}
