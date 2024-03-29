const Transform = function (basis, helmert) {
  // @Transform(basis, helmert)
  //
  // The Transform models rotations on xy-plane, uniform scalings and
  // translations in xyz-space.
  // The Transform also has a reference to its element basis
  // which allows us to represent the transform on other elements when needed.
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
proto.isTransform = true

// Class methods
Transform.fromFeatures = require('./fromFeatures')(Transform)
Transform.estimate = require('./estimate')(Transform)

// Instance methods
proto.changeBasis = require('./changeBasis')
proto.getRaw = require('./getRaw')
proto.getRotation = require('./getRotation')
proto.getTranslation = require('./getTranslation')
proto.inverse = require('./inverse')
proto.invert = proto.inverse
proto.transit = proto.changeBasis
proto.transitRaw = require('./transitRaw')

// Handle circular dependencies.
const factorGetVector = require('./getVector')
Transform.patchCircular = (Vector) => {
  proto.getVector = factorGetVector(Vector)
  delete Transform.patchCircular // once
}
