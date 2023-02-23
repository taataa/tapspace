const size3 = require('affineplane').size3

const Size = function (basis, size) {
  // @Size(basis, size)
  //
  // A cuboid size in space. Basically it is three-dimensional distance.
  // If you need to represent a rectangular or cuboid shape in space,
  // use Path, Polygon, or Box instead as they can be reliably transited
  // between bases.
  //
  // Parameters
  //   basis
  //     a Basis
  //   size
  //     a size3 object `{ w, h, d }`.
  //

  // DEBUG
  if (!size3.validate(size)) {
    throw new Error('Invalid size3')
  }

  this.basis = basis
  this.size = size
}

const proto = Size.prototype
module.exports = Size

proto.changeBasis = require('./changeBasis')
proto.getArea = require('./getArea')
proto.getRaw = require('./getRaw')
// TODO proto.resizeTo
// TODO proto.resizeToNorm
proto.scaleBy = require('./scaleBy')
proto.transit = proto.changeBasis
proto.transitRaw = require('./transitRaw')
