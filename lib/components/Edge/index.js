const AbstractPlane = require('../AbstractPlane')

const AffineEdge = function (border, opts) {
  // Edge is an instance class for a div with one visible border.
  // It can be used as a line that connects components.
  //
  // Parameters:
  //   border
  //     a string. A CSS border style e.g. '1px solid #ff2200'
  //   opts, optional object
  //     id
  //       optional string. The id attribute of the element.
  //     className
  //       optional string. The class attribute of the element.
  //     anchor
  //       optional { x, y } on the element. Default {x:0,y:0}
  //

  if (!opts) {
    opts = {}
  }

  // Create a new element.
  const element = document.createElement('div')

  // Set id if applicable
  if (opts.id) {
    element.id = opts.id
  }

  // Set class name and handle className option
  let className = 'affine-element affine-edge'
  if (opts.className) {
    className = className + ' ' + opts.className
  }
  element.className = className

  // Set given border style
  element.style.borderTop = border

  // Default anchor
  // We should not let parent classes handle default values
  // because we must set anchor key even when value nullish.
  if (!opts.anchor) {
    opts.anchor = { x: 0, y: 0 }
  }

  AbstractPlane.call(this, element, {
    anchor: opts.anchor
  })
}

// Inherit
const proto = AffineEdge.prototype
Object.assign(proto, AbstractPlane.prototype)
module.exports = AffineEdge
