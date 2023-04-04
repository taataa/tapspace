// TODO We need this
// TODO to place content to positions and orientations
// TODO that are obtainable via transformations such as rotations
// TODO without transforming the basis element itself.

const plane3 = require('affineplane').plane3

const Basis = function (basis, transition) {
  // @Basis(basis, transition)
  //
  // A virtual basis in space.
  // For example, affine elements can be transformed to match
  // the scale, orientation, and position of a virtual basis.
  //
  // Parameters
  //   basis
  //     a BasisElement
  //   transition
  //     a plane3 object `{ a, b, x, y, z }` in the basis.
  //     .. It is a passive transformation from the virtual basis to
  //     .. the basis element.
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

// Methods
proto.at = require('./at')
proto.changeBasis = require('./changeBasis')
proto.getOrientation = require('./getOrientation')
proto.getPoint = proto.at
proto.getRaw = require('./getRaw')
proto.rotateBy = require('./rotateBy')
proto.scaleBy = require('./scaleBy')
proto.transformBy = require('./transformBy')
proto.transitRaw = require('./transitRaw')
proto.transitRawOuter = require('./transitRawOuter')
proto.translateBy = require('./translateBy')
