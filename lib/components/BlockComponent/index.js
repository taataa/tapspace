const Transformer = require('../Transformer')

const BlockComponent = function (element) {
  // @BlockComponent(element)
  //
  // Inherits Transformer
  //
  // BlockComponent is an abstract class for rectangular affine components that
  // cannot change their size or the size depends on the browser layout.
  // For example, Viewport is a BlockComponent because its dimensions depend on
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

const proto = BlockComponent.prototype
module.exports = BlockComponent
proto.isBlockComponent = true

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
proto.getArea = require('./getArea')
proto.getBoundingBox = require('./getBoundingBox')
proto.getBoundingCircle = require('./getBoundingCircle')
proto.getDiameter = require('./getDiameter')
// TODO proto.getHull = require('./getHull')
proto.getNormalizedPoint = proto.atNorm
proto.getSize = require('./getSize')
proto.getWidth = require('./getWidth')
proto.getHeight = require('./getHeight')
proto.moveCenterTo = require('./moveCenterTo')
proto.normAt = require('./normAt')
proto.scaleToFill = require('./scaleToFill')
proto.scaleToFit = require('./scaleToFit')
proto.scaleToHeight = require('./scaleToHeight')
proto.scaleToWidth = require('./scaleToWidth')
