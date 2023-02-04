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

// Class functions
Box.fromPoints = require('./fromPoints')(Box)
Box.fromBoxes = require('./fromBoxes')(Box)

// Methods
proto.at = require('./at')
proto.atNorm = require('./atNorm')
proto.atToNorm = require('./atToNorm')
proto.changeBasis = require('./changeBasis')
proto.getBoundingBox = require('./getBoundingBox')
proto.getDepth = require('./getDepth')
proto.getHeight = require('./getHeight')
proto.getRaw = require('./getRaw')
proto.getSize = require('./getSize')
proto.getWidth = require('./getWidth')
proto.rotateBy = require('./rotateBy')
proto.scaleBy = require('./scaleBy')
proto.transitRaw = require('./transitRaw')