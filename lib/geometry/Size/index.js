const Size = function (basis, size) {
  // tapspace.geometry.Size(basis, size)
  //
  // A rectangular size in space. Basically it is two-dimensional distance.
  // If you need to represent a rectangular shape in space, use Path or Polygon
  // instead.
  //
  // Parameters
  //   basis
  //     a Component
  //   size
  //     a size2 object `{ w, h }`.
  //
  this.basis = basis
  this.size = size
}

const proto = Size.prototype
module.exports = Size

proto.at = require('./at')
proto.atNorm = require('./atNorm')
proto.atToNorm = require('./atToNorm')
proto.changeBasis = require('./changeBasis')
proto.getPlain = require('./getPlain')
proto.scaleBy = require('./scaleBy')
proto.transit = proto.changeBasis
proto.transitPlain = require('./transitPlain')
