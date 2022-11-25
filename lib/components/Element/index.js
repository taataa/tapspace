const Item = require('../Item')

const AffineElement = function (content) {
  // tapspace.components.Element(content)
  //
  // Inherits Item
  //
  // Instance class for custom HTMLElement on affine plane.
  //
  // Parameters:
  //   content
  //     a HTMLElement or HTML string. The given element(s) will be
  //     ..wrapped in an affine div.
  //

  // Create a new wrapper element.
  const element = document.createElement('div')

  // Set class name
  element.className = 'affine-element'

  // Inherit
  Item.call(this, element)

  // Insert the content
  this.html(content)
}

module.exports = AffineElement
const proto = AffineElement.prototype

// Inherit
Object.assign(proto, Item.prototype)

// Methods
proto.html = require('./html')
