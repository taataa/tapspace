const AbstractItem = require('../AbstractItem')

const AffineElement = function (content, opts) {
  // taataa.components.Element(content, opts)
  //
  // Inherits AbstractItem
  //
  // Instance class for custom HTMLElement on affine plane.
  //
  // Parameters:
  //   content
  //     a HTMLElement or HTML string. The given element(s) will be
  //     ..wrapped in an affine div.
  //   opts
  //     id
  //       a string, optional. The id attribute of the wrapper element.
  //     className
  //       a string, optional. The class attribute of the wrapper element.
  //     anchor
  //       { x, y } on the element. Default {x:0,y:0}
  //     size
  //       { width, height }
  //

  if (!opts) {
    opts = {}
  }

  // Create a new wrapper element.
  const element = document.createElement('div')

  // Set id if applicable
  if (opts.id) {
    element.id = opts.id
  }

  // Set class name and handle className option
  let className = 'affine-element'
  if (opts.className) {
    className = className + ' ' + opts.className
  }
  element.className = className

  // Inherit
  AbstractItem.call(this, element, opts)

  // Insert the content
  this.html(content)
}

// Prototype for inheritance and methods.
const proto = AffineElement.prototype
// Inherit
Object.assign(proto, AbstractItem.prototype)
// Export
module.exports = AffineElement

proto.html = require('./html')
