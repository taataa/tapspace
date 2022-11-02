
const Transform = function (basis, helmert) {
  // tapspace.geometry.Transform(basis, helmert)
  //
  // The Transform models rotations on xy-plane, uniform scalings and
  // translations in xyz-space.
  // The Transform also has a reference to its basis element
  // which allows us to represent the transform in other bases when needed.
  // The Transform is a compact special case of a
  // Helmert transformation, and more generally, a special case of
  // a homogeneous (aka augmented) 4x4 transform matrix for 3D space.
  //
  // Parameters
  //   basis
  //     a Component
  //   helmert
  //     a helm3 object, a Helmert transformation.
  //
  // Properties:
  //   basis, helm
  //
  this.basis = basis
  this.helm = helmert

  // Set z=0 if missing.
  if (typeof helmert.z !== 'number') {
    this.helm.z = 0
  }
}

module.exports = Transform
const proto = Transform.prototype

// Class methods
Transform.fromFeatures = require('./fromFeatures')
Transform.estimate = require('./estimate')

// Instance methods
proto.changeBasis = require('./changeBasis')
proto.getRaw = require('./getRaw')
proto.getTranslation = require('./getTranslation')
proto.inverse = require('./inverse')
proto.invert = proto.inverse
proto.transit = proto.changeBasis
proto.transitRaw = require('./transitRaw')
