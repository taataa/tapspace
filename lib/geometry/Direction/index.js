const dir3 = require('affineplane').dir3
const Vector = require('../Vector') // circular

const Direction = function (basis, vec) {
  // tapspace.geometry.Direction(basis, vec)
  //
  // Direction in 3D space, modeled as a unit vector.
  //
  // The values of the direction depend on the orientation of the coordinate
  // space and therefore they need conversion when transited between planes.
  // Direction models a passive shape in space. Its active variant is Rotation.
  //
  // Parameters
  //   basis
  //     a Component
  //   vec
  //     a Vector, or {x,y,z} relative to the basis.
  //

  if (vec.changeBasis) {
    vec = vec.changeBasis(basis)
  }

  // tapspace.geometry.Direction:basis
  // The basis component. Usage: `dir.basis`.
  this.basis = basis
  // tapspace.geometry.Direction:dir
  // A unit vector, affineplane.dir3. Usage: `dir.dir`.
  this.dir = dir3.fromVector(vec)
}

module.exports = Direction
const proto = Direction.prototype

// Class functions
Direction.fromVector = require('./fromVector')(Direction)
Direction.fromSpherical = require('./fromSpherical')(Direction)

// Methods
proto.changeBasis = require('./changeBasis')
proto.getVector = require('./getVector')(Vector)
