const Basis = require('../Basis')

const Space = function () {
  // @Space()
  //
  // Inherits Basis
  //
  // Space is a 3D basis and container for items, planes, and other spaces.
  // The space has unlimited width and height. Under the hood, a space is
  // an HTMLElement with zero size, visible overflow, and preserved 3D
  // transformations.
  //

  // TODO where to capture input, in view or space?

  // Create element for the space
  const elem = document.createElement('div')
  elem.className = 'affine-space'

  // Inherit
  Basis.call(this, elem)
}

module.exports = Space
const proto = Space.prototype

// Inherit
Object.assign(proto, Basis.prototype)

// Functions
Space.create = require('./create')(Space)
