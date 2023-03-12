const sphere3 = require('affineplane').sphere3

const Sphere = function (basis, sphere) {
  // @Sphere(basis, sphere)
  //
  // A sphere in space. A sphere has origin point and a radius.
  // Spheres do not have orientation and therefore lack
  // the at() method for example.
  //
  // Parameters
  //   basis
  //     a Basis
  //   sphere
  //     a sphere3 object `{ x, y, z, r }`.
  //

  // Debug
  if (!sphere3.validate(sphere)) {
    throw new Error('Invalid sphere argument')
  }

  this.basis = basis
  this.sphere = sphere
}

const proto = Sphere.prototype
module.exports = Sphere

// Methods
proto.atCenter = require('./atCenter')
proto.atMid = proto.atCenter
proto.changeBasis = require('./changeBasis')
