//
// SpaceImage
//
var AbstractRectangle = require('./AbstractRectangle')
var extend = require('extend')

var SpaceImage = function (img, parent) {
  // Parameters:
  //   img
  //     a preloaded HTMLImageElement
  //   parent
  //     a AbstractNode, optional, default to null
  //
  if (typeof img !== 'object') {
    throw new Error('Invalid image')
  }
  AbstractRectangle.call(this)

  this.image = img
  this.setSize(img.width, img.height) // Size of the rectangle

  if (typeof parent === 'object') {
    this.setParent(parent)
  }
}

SpaceImage.prototype = extend({}, AbstractRectangle.prototype)

SpaceImage.prototype.copy = function () {
  // Return a copy of the SpaceImage.
  // The copy has the same image and size but is not attached to a parent.
  //
  var si = new SpaceImage(this.image)
  si.setSize(this.getSize())
  return si
}

SpaceImage.prototype.getImage = function () {
  return this.image
}

module.exports = SpaceImage
