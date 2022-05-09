const AbstractRectangle = require('../AbstractRectangle')

const AffineComponent = function (content, opts) {
  // Instance class for custom HTML elements on affine plane.
  //
  // Parameters:
  //   content
  //     a HTMLElement or HTML string. The given element(s) will be
  //     ..wrapped in a div.
  //   opts
  //     gravity
  //       { x, y } on the element. Default {x:0,y:0}
  //     size
  //       { width, height }
  //

  const element = document.createElement('div')
  element.className = 'affine-element'

  if (typeof content === 'string') {
    // Treat as HTML string.
    element.innerHTML = content
  } else if (typeof content === 'object') {
    // Treat as HTMLElement
    // TODO stricter check.
    element.appendChild(content)
  }

  AbstractRectangle.call(this, element, opts)
}

// Inherit from AbstractRectangle
const proto = Object.assign({}, AbstractRectangle.prototype)
AffineComponent.prototype = proto
module.exports = AffineComponent
