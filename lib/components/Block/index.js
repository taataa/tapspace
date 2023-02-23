const Transformer = require('../Transformer')

const Block = function (element) {
  // @Block(element)
  //
  // Inherits Transformer
  //
  // Block is an abstract class for rectangular affine components that
  // cannot change their size or the size depends on the browser layout.
  // For example, View is a Block because its dimensions depend on
  // external CSS rules and page dimensions.
  //
  // Subclasses must override methods:
  // - atNorm, normAt
  // - getHeight, getSize, getWidth.
  //
  // Parameters:
  //   element
  //     an HTMLElement. The element does not need to be in DOM.
  //

  // Inherit
  Transformer.call(this, element)
}

const proto = Block.prototype
module.exports = Block
proto.isBlock = true

// Inherit
Object.assign(proto, Transformer.prototype)

// Methods
proto.atBottomLeft = require('./atBottomLeft')
proto.atBottomMid = require('./atBottomMid')
proto.atBottomRight = require('./atBottomRight')
proto.atCenter = require('./atMidMid')
proto.atMidLeft = require('./atMidLeft')
proto.atMid = proto.atCenter
proto.atMidMid = proto.atCenter
proto.atMiddle = proto.atCenter
proto.atMidRight = require('./atMidRight')
proto.atNorm = require('./atNorm')
proto.atTopLeft = require('./atTopLeft')
proto.atTopMid = require('./atTopMid')
proto.atTopRight = require('./atTopRight')
// TODO proto.getHull = require('./getHull')
proto.getBoundingBox = require('./getBoundingBox')
proto.getSize = require('./getSize')
proto.getWidth = require('./getWidth')
proto.getHeight = require('./getHeight')
proto.moveCenterTo = require('./moveCenterTo')
proto.normAt = require('./normAt')
proto.scaleToFill = require('./scaleToFill')
proto.scaleToFit = require('./scaleToFit')
proto.scaleToHeight = require('./scaleToHeight')
proto.scaleToWidth = require('./scaleToWidth')
