const Size = function (basis, size) {
  // @Size(basis, size)
  //
  // A rectangular size in space. Basically it is two-dimensional distance.
  // If you need to represent a rectangular shape in space, use Path or Polygon
  // instead.
  //
  // Parameters
  //   basis
  //     a Basis
  //   size
  //     a size2 object `{ w, h }`.
  //
  this.basis = basis
  this.size = size
}

const proto = Size.prototype
module.exports = Size

proto.changeBasis = require('./changeBasis')
proto.getRaw = require('./getRaw')
proto.scaleBy = require('./scaleBy')
proto.transit = proto.changeBasis
proto.transitRaw = require('./transitRaw')
