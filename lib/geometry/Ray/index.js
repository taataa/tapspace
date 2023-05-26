const Ray = function (basis, ray) {
  // @Ray(basis, ray)
  //
  // A ray tensor. The ray is like a line but extends to infinity only
  // at one direction.
  //
  // Parameters
  //   basis
  //     a Component
  //   ray
  //     a ray3 object `{x,y,z,dx,dy,dz}`
  //
  this.basis = basis
  this.ray = ray
}

module.exports = Ray
const proto = Ray.prototype
proto.isRay = true

// Class functions
Ray.create = require('./create')(Ray)

// Methods
proto.at = require('./at')
proto.getDistanceToPoint = require('./getDistanceToPoint')
proto.getPoint = proto.at
