const Item = require('../Item')

const AffineElement = function (element) {
  // tapspace.components.Element(element)
  //
  // Inherits Item
  //
  // Instance class for custom HTMLElement on affine plane.
  //
  // Parameters:
  //   element
  //     a HTMLElement, the wrapper.
  //

  // Inherit
  Item.call(this, element)
}

module.exports = AffineElement
const proto = AffineElement.prototype

// Inherit
Object.assign(proto, Item.prototype)

// Methods
proto.html = require('./html')
