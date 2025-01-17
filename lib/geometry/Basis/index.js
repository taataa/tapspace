const plane3 = require('affineplane').plane3

const Basis = function (basis, transition) {
  // @Basis(basis, transition)
  //
  // A virtual basis in space, a basis tensor.
  // This helps you to represent a basis in space regardless
  // the coordinate system of the reference element.
  // For example, affine elements can be transformed to match
  // the scale, orientation, and position of a virtual basis.
  //
  // Parameters
  //   basis
  //     a Component
  //   transition
  //     a plane3 object `{ a, b, x, y, z }` in the basis.
  //     .. It is a passive transformation from the virtual basis to
  //     .. the element basis.
  //

  // Debug
  if (!plane3.validate(transition)) {
    throw new Error('Invalid transition argument')
  }

  this.basis = basis
  this.tran = transition
}

const proto = Basis.prototype
module.exports = Basis
proto.isBasis = true

// Class functions
Basis.fromPoints = require('./fromPoints')(Basis)

// Methods
proto.almostEqual = require('./almostEqual')
proto.at = require('./at')
proto.changeBasis = require('./changeBasis')
proto.createDistance = require('./createDistance')
proto.createDirection = require('./createDirection')
proto.createVector = require('./createVector')
proto.equal = require('./equal')
proto.getMatchedOuter = require('./getMatchedOuter')
proto.getOrientation = require('./getOrientation')
proto.getPoint = proto.at
proto.getRaw = require('./getRaw')
proto.getScale = require('./getScale')
proto.innerOffset = require('./offset')
proto.offset = proto.innerOffset
proto.outerOffset = require('./outerOffset')
proto.polarOffset = require('./polarOffset')
proto.rotateBy = require('./rotateBy')
proto.rotateByDegrees = require('./rotateByDegrees')
proto.scaleBy = require('./scaleBy')
proto.transformBy = require('./transformBy')
proto.transitRaw = require('./transitRaw')
proto.transitRawOuter = require('./transitRawOuter')
proto.translateBy = require('./translateBy')

// Handle circular dependencies.
const getTransformTo = require('./getTransformTo')
Basis.patchCircular = (Transform) => {
  proto.getTransformTo = getTransformTo(Transform)
  delete Basis.patchCircular // once
}
