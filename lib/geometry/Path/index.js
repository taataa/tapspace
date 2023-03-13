
const Path = function (basis, points) {
  // @Path(basis, points)
  //
  // A sequence of Points in 3D space.
  //
  // Example
  // ```
  // let pa = new tapspace.geometry.Path(basis, [
  //   { x: 0, y: 1, z: 2 },
  //   { x: 1, y: 2, z: 3 },
  // ])
  // ```
  //
  // Parameters
  //   basis
  //     a Basis
  //   points
  //     an array of plain point objects {x,y,z}
  //
  this.basis = basis
  this.path = points
}

// TODO Definition:
// **The hull order:** When a `Path` represents the convex hull of an item,
// the `Point` points of the path have astrict order.
// - The first point is the `Point` with most negative x and y value.
// - The points after the first come in anticlockwise order. For example,
//   .. the convex hull of a unit square is (0,0), (0,1), (1,1), and (1,0).
//

module.exports = Path
const proto = Path.prototype
proto.isPath = true

// Instance methods
proto.changeBasis = require('./changeBasis')
proto.getRaw = require('./getRaw')
proto.transit = proto.changeBasis
proto.transitRaw = require('./transitRaw')
