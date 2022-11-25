const Plane = require('../Plane')

const Block = function (element) {
  // @Block(element)
  //
  // Abstract class for rectangular affine components that cannot change
  // their size or the size depends on the browser layout.
  // For example, View is a Block because its dimensions depend on
  // external CSS rules and page dimensions.
  //
  // Subclasses must override methods: atNorm, atToNorm, getHeight, getSize,
  // getWidth.
  //
  // Parameters:
  //   element
  //     a HTMLElement. The element does not need to be in DOM.
  //

  // Inherit from Plane
  Plane.call(this, element)
}

// Inherit from Plane
const proto = Block.prototype
Object.assign(proto, Plane.prototype)
module.exports = Block

// Methods
proto.atNorm = require('./atNorm')
proto.atToNorm = require('./atToNorm')

proto.atTopLeft = require('./atTopLeft')
proto.atTopMid = require('./atTopMid')
proto.atTopRight = require('./atTopRight')
proto.atMidLeft = require('./atMidLeft')
proto.atMidMid = require('./atMidMid')
proto.atMid = proto.atMidMid
proto.atMiddle = proto.atMidMid
proto.atCenter = proto.atMidMid
proto.atMidRight = require('./atMidRight')
proto.atBottomLeft = require('./atBottomLeft')
proto.atBottomMid = require('./atBottomMid')
proto.atBottomRight = require('./atBottomRight')

proto.moveCenterTo = require('./moveCenterTo')
// TODO proto.getHull = require('./getHull')
proto.getSize = require('./getSize')
proto.getWidth = require('./getWidth')
proto.getHeight = require('./getHeight')
