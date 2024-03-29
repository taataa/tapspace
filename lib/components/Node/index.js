const Item = require('../Item')

const Node = function (radius, color) {
  // @Node(radius, color)
  //
  // Inherits Item
  //
  // A colorful circle.
  // Instance class for a circle-like object on an affine plane.
  // Useful for debugging coordinate positions.
  //
  // Parameters:
  //   radius
  //     a number.
  //   color
  //     optional string. A CSS color e.g. '#ff2200' or 'rgb(123,123,123)'
  //     Leave undefined if you want to control the color via CSS classes.
  //

  // Create a new element.
  const element = document.createElement('div')

  // Set given color if any
  if (color) {
    element.style.backgroundColor = color
  }
  // Set border radius to create the circle shape.
  element.style.borderRadius = radius + 'px'

  // Inherit
  Item.call(this, element)

  // Set class name after inherit to preserve class name order. Necessary?
  element.classList.add('affine-circle') // deprecate?
  element.classList.add('affine-node')

  this.setAnchor({ x: radius, y: radius, z: 0 })
  this.setSize({ w: radius * 2, h: radius * 2 })
}

module.exports = Node
const proto = Node.prototype
proto.isCircle = true

// Inherit
Object.assign(proto, Item.prototype)

// Functions
Node.create = require('./create')(Node)

// Overriding methods
proto.getBoundingBox = require('./getBoundingBox')
proto.getBoundingCircle = require('./getBoundingCircle')

// Methods
proto.getDiameter = require('./getDiameter')
proto.getRadius = require('./getRadius')
