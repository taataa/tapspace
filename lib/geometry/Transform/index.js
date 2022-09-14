
const Transform = function (basis, a, b, x, y, z) {
  // tapspace.geometry.Transform(basis, a, b, x, y, z)
  //
  // The Transform models rotations and uniform scalings on xy-plane and
  // translations in xyz-space.
  // The Transform also has a reference to its basis element
  // which allows us to represent the transform in other bases when needed.
  //
  // Parameters
  //   basis
  //     a Component
  //   a
  //     a number or a helm3
  //   b
  //     a number
  //   x
  //     a number
  //   y
  //     a number
  //   z
  //     a number
  //
  // Object properties:
  //   basis, a, b, x, y, z
  //
  this.basis = basis
  if (typeof a === 'object') {
    this.a = a.a
    this.b = a.b
    this.x = a.x
    this.y = a.y
    this.z = a.z ? a.z : 0
  } else {
    this.a = a
    this.b = b
    this.x = x
    this.y = y
    this.z = this.z ? this.z : 0
  }
}

module.exports = Transform
const proto = Transform.prototype

// Class methods
Transform.fromFeatures = require('./fromFeatures')
Transform.estimate = require('./estimate')

// Instance methods
proto.changeBasis = require('./changeBasis')
proto.getTranslation = require('./getTranslation')
proto.inverse = require('./inverse')
proto.invert = proto.inverse
