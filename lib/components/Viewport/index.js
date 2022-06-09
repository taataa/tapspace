const AbstractView = require('../AbstractView')

const AffineViewport = function (element, opts) {
  // AffineViewport
  // Inherits AbstractView
  //
  // TODO The viewport transformation to the element are inverted to its children
  // instead of the element itself. This, combined to overflow styles
  // set by affine-viewport CSS class, creates an illusion of a viewport
  // to a 2D space.
  //
  // Parameters
  //   element
  //     HTMLElement or query string
  //   opts
  //     width
  //       a number in pixels or a CSS width string.
  //     height
  //       a number in pixels or a CSS height string.
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

  // Ensure the element has class affine-viewport.
  // The class name might be set already. Class name duplicate is harmless.
  element.className = element.className + ' affine-viewport'

  // Inherit AbstractView properties
  AbstractView.call(this, element, opts)
}

const proto = Object.assign({}, AbstractView.prototype)
AffineViewport.prototype = proto
module.exports = AffineViewport

// Class method
AffineViewport.create = require('./create')
