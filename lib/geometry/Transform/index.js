
const Transform = function (basis, a, b, x, y, z) {
  // tapspace.geometry.Transform(basis, a, b, x, y, z)
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
proto.getTranslation = require('./getTranslation')
proto.inverse = require('./inverse')
proto.invert = proto.inverse
proto.changeBasis = require('./changeBasis')
