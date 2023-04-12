const TransformerComponent = require('../TransformerComponent')

const Space = function () {
  // @Space()
  //
  // Inherits TransformerComponent
  //
  // Space is a 3D basis and container for items, planes, and other spaces.
  // The space has unlimited width and height. Under the hood, a space is
  // an HTMLElement with zero size, visible overflow, and it preserves 3D
  // transformations.
  //

  // TODO where to capture input, in view or space?

  // Create element for the space
  const elem = document.createElement('div')
  elem.className = 'affine-space'

  // Inherit
  TransformerComponent.call(this, elem)
}

module.exports = Space
const proto = Space.prototype
proto.isSpace = true

// Inherit
Object.assign(proto, TransformerComponent.prototype)

// Functions
Space.create = require('./create')(Space)

// Methods
proto.atNorm = require('./atNorm')
proto.getBoundingBox = require('./getBoundingBox')
proto.getBoundingSphere = require('./getBoundingSphere')
proto.getSize = require('./getSize')
