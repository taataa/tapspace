const Composite = require('../Composite')

const Space = function () {
  // @Space()
  //
  // Inherits Composite
  //
  // A boundless container for space components.
  //
  // Example
  // ```
  // const nodespace = tapspace.createSpace()
  // viewport.addChild(nodespace)
  // const node = tapspace.createNode(20)
  // nodespace.addChild(node)
  // ```
  //

  // Create element for the space
  const elem = document.createElement('div')
  elem.className = 'affine-space'

  // Inherit
  Composite.call(this, elem)
}

module.exports = Space
const proto = Space.prototype
proto.isSpace = true

// Inherit
Object.assign(proto, Composite.prototype)

// Functions
Space.create = require('./create')(Space)
