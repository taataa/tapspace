const dir3 = require('affineplane').dir3

const Direction = function (basis, vec) {
  // @Direction(basis, vec)
  //
  // Direction in 3D space, modeled as a unit vector.
  //
  // The values of the direction depend on the orientation of the coordinate
  // space and therefore they need conversion when transited between planes.
  // Direction models a passive shape in space. Its active variant is Rotation.
  //
  // Parameters
  //   basis
  //     a BasisElement
  //   vec
  //     a Vector, or {x,y,z} relative to the basis.
  //

  if (vec.transitRaw) {
    vec = vec.transitRaw(basis)
  }

  // @Direction:basis
  // Property for the basis component. Usage: `dir.basis`.
  this.basis = basis
  // @Direction:dir
  // Property for the unit vector, affineplane.dir3. Usage: `dir.dir`.
  this.dir = dir3.fromVector(vec)
}

module.exports = Direction
const proto = Direction.prototype
proto.isDirection = true

// Class functions
Direction.fromVector = require('./fromVector')(Direction)
Direction.fromSpherical = require('./fromSpherical')(Direction)

// Methods
proto.changeBasis = require('./changeBasis')
proto.getRaw = require('./getRaw')
proto.toVector = proto.getVector
proto.transit = proto.changeBasis
proto.transitRaw = require('./transitRaw')

// Handle circular dependencies.
const factorGetVector = require('./getVector')
Direction.patchCircular = (Vector) => {
  proto.getVector = factorGetVector(Vector)
  delete Direction.patchCircular // once
}
