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
  //     a Component
  //   size
  //     a size3 object `{ w, h, d }`.
  //

  // TODO maybe get rid of the pseudo-tensor Size in favour of Box.

  // DEBUG
  if (!size3.validate(size)) {
    throw new Error('Invalid size3')
  }

  this.basis = basis
  this.size = size
}

const proto = Size.prototype
module.exports = Size
proto.isSize = true

proto.almostEqual = require('./almostEqual')
proto.changeBasis = require('./changeBasis')
proto.equal = require('./equal')
proto.getArea = require('./getArea')
proto.getRaw = require('./getRaw')
proto.normAt = require('./normAt')
// TODO proto.resizeTo
// TODO proto.resizeToNorm
proto.scaleBy = require('./scaleBy')
proto.transit = proto.changeBasis
proto.transitRaw = require('./transitRaw')
