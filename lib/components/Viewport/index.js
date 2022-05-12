// AffineViewport
// Inherits AbstractRectangle
//
// TODO The viewport transformation to the element are inverted to its children
// instead of the element itself. This, combined to overflow styles
// set by affine-viewport CSS class, creates an illusion of a viewport
// to a 2D space.
//
const AbstractView = require('../AbstractView')

const AffineViewport = function (element, opts) {
  // Parameters
  //   element
  //     HTMLElement or query string
  //   opts
  //     size
  //       a { width, height }
  //     interaction
  //       pannable
  //         boolean, default true
  //       scalable
  //         boolean, default true
  //       rotatable
  //         boolean, default false
  //       wheelable
  //         boolean, default true
  //
  if (typeof element === 'string') {
    // Treat as selector string. The querySelector returns the first match.
    // If not found, results null
    element = document.querySelector(element)
  }

  AbstractView.call(this, element, opts)
}

const proto = Object.assign({}, AbstractView.prototype)
AffineViewport.prototype = proto
module.exports = AffineViewport
