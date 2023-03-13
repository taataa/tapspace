const orient2 = require('affineplane').orient2

const Orientation = function (basis, orient) {
  // @Orientation(basis, orient)
  //
  // Orientation in 3D space, but limited to rotations around z-axis (for now).
  //
  // The values of the orientation depend on the orientation of the coordinate
  // space and therefore they need conversion when transited between bases.
  // Orientation is a passive state in space. Its active variant is Rotation.
  //
  // Parameters
  //   basis
  //     a Basis
  //   orient
  //     a orient2, or {a,b} relative to the basis.
  //

  // DEBUG
  if (!orient2.validate(orient)) {
    throw new Error('Invalid orient2 object')
  }

  // @Orientation:basis
  // Property of orientation, a Basis. Usage: `orientation.basis`.
  this.basis = basis
  // @Orientation:orient
  // Property of orientation, affineplane.orient2. Usage: `orientation.orient`.
  this.orient = orient
}

module.exports = Orientation
const proto = Orientation.prototype
proto.isOrientation = true

// Class functions
Orientation.fromVectorBasis = require('./fromVectorBasis')(Orientation)

// Methods
proto.changeBasis = require('./changeBasis')
proto.getRaw = require('./getRaw')
proto.transit = proto.changeBasis
proto.transitRaw = require('./transitRaw')
proto.transitRawOuter = require('./transitRawOuter')

// Handle circular dependencies.
const getUnitX = require('./getUnitX')
const getUnitY = require('./getUnitY')
const getUnitZ = require('./getUnitZ')
Orientation.patchCircular = (Vector) => {
  proto.getUnitX = getUnitX(Vector)
  proto.getUnitY = getUnitY(Vector)
  proto.getUnitZ = getUnitZ(Vector)
}
