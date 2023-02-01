const box3 = require('affineplane').box3

const Box = function (basis, box) {
  // @Box(basis, box)
  //
  // A rectangular box in space. Basically it is three-dimensional cuboid
  // that has two faces parallel to xy-plane. A box has basis in space and
  // a position, orientation, and size in that basis. In a way the box has
  // two bases, the basis in space and its placement basis respective of
  // the basis in space. This is necessary in order to represent the box
  // in any basis, not only those that are orthogonal to it.
  //
  // Parameters
  //   basis
  //     a Basis
  //   box
  //     a box3 object `{ a, b, x, y, z, w, h, d }`.
  //

  // Debug
  if (!box3.validate(box)) {
    throw new Error('Invalid box argument')
  }

  this.basis = basis
  this.box = box
}

const proto = Box.prototype
module.exports = Box

proto.at = require('./at')
proto.atNorm = require('./atNorm')
proto.changeBasis = require('./changeBasis')
proto.getSize = require('./getSize')
proto.getRaw = require('./getRaw')
proto.transitRaw = require('./transitRaw')
