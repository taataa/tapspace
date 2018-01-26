//
// SpaceImage
//
var AbstractRectangle = require('./AbstractRectangle')
var Vector = require('./Vector')
var extend = require('extend')

var SpaceImage = function (parent, img) {
  // Parameters:
  //   parent
  //     a AbstractNode
  //   img
  //     a preloaded HTMLImageElement
  //
  if (typeof img !== 'object') {
    throw new Error('Invalid image')
  }
  AbstractRectangle.call(this)

  this.image = img
  this.setLocalSize(new Vector(img.width, img.height))  // Size of the rectangle
  this.setParent(parent)
}

SpaceImage.prototype = extend({}, AbstractRectangle.prototype)

module.exports = SpaceImage
