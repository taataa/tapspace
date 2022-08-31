const AbstractView = require('../AbstractView')
const AbstractActive = require('../AbstractActive')

const AffineViewport = function (element, opts) {
  // tapspace.components.Viewport
  //
  // Inherits AbstractView
  //
  // When the viewport is transformed, it does not move on the page.
  // Instead, the space and its root planes are moved
  // in opposite direction. This, combined with overflow CSS styles,
  // creates an illusion of a viewport into a 2D space.
  //
  // Parameters
  //   element
  //     HTMLElement or query string
  //   opts
  //     optional object with properties:
  //       size
  //         optional object with properties:
  //         width
  //           a number in pixels or a CSS width string.
  //         height
  //           a number in pixels or a CSS height string.
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
  // Inherit AbstractActive properties
  // TODO pass options
  AbstractActive.call(this)
}

const proto = AffineViewport.prototype
Object.assign(proto, AbstractView.prototype)
Object.assign(proto, AbstractActive.prototype)
module.exports = AffineViewport

// Abilities
proto.navigable = require('./navigable')
proto.pannable = require('./pannable')
proto.responsive = require('./responsive')
proto.rotatable = require('./rotatable')
proto.rotateable = proto.rotatable
proto.zoomable = require('./zoomable')
proto.scalable = proto.zoomable
