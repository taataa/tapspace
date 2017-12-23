//
// SpaceImage
//
var SpaceRectangle = require('./SpaceRectangle')
var Vector = require('./Vector')
var extend = require('extend')

var SpaceImage = function (parent, img) {
  // Parameters:
  //   parent
  //     a SpaceNode
  //   img
  //     a preloaded HTMLImageElement
  //
  if (typeof img !== 'object') {
    throw new Error('Invalid image')
  }
  SpaceRectangle.call(this)

  this.image = img
  this.setLocalSize(new Vector(img.width, img.height))  // Size of the rectangle
  this.setParent(parent)
}

SpaceImage.prototype = extend({}, SpaceRectangle.prototype)

module.exports = SpaceImage
