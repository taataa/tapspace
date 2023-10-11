const Transformer = require('../Transformer')

const Composite = function (element) {
  // @Composite(element)
  //
  // Inherits Transformer
  //
  // An abstract class for components that have no intrinsic size
  // but rather are a collection of child components and their descendants.
  // Composite sizes and boundaries are determined by the shapes
  // of the descendants.
  //
  // Parameters:
  //   element
  //     an HTMLElement
  //

  // Use default anchor 0,0
  Transformer.call(this, element)

  // Add special class
  element.classList.add('affine-composite')
}

module.exports = Composite
const proto = Composite.prototype
proto.isComposite = true

// Inherit
Object.assign(proto, Transformer.prototype)

// Methods
proto.getBoundingBox = require('./getBoundingBox')
proto.getBoundingCircle = require('./getBoundingCircle')
proto.getSize = require('./getSize')
