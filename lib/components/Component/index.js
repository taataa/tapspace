const AbstractRectangle = require('../AbstractRectangle')
const Drag = require('../../interaction/Drag')
const Slide = require('../../interaction/Slide')
const TransformCapturer = require('../../interaction/TransformCapturer')

const AffineComponent = function (content, opts) {
  // Instance class for custom HTML elements on affine plane.
  //
  // Parameters:
  //   content
  //     a HTMLElement or HTML string. The given element(s) will be
  //     ..wrapped in a div.
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

  // Insert the given content.
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

proto.draggable = function (opts) {
  // The item can be moved freely by a set of pointers.
  // The item maintains the size and the angle.
  //
  // Draggable is better term than movable because
  // movable is meaningful in two sense: moveable programmatically
  // or moveable physically by user.
  if (opts === false) {
    // TODO stop draggable
    this.interaction.destroy()
    this.interaction = null
    return
  }

  // TODO maybe use existing capturer
  this.capturer = new TransformCapturer(opts)

  // TODO shut down old interaction
  if (this.interaction) {
    this.interaction.off()
  }

  // Begin drag interaction
  this.interaction = new Drag(this.capturer, this.element)
}

proto.slideable = function (opts) {
  // The component can be moved along a line, with limits.
  //
  // Parameters:
  //   opts
  //     angle
  //       a number, angle in radians
  //     min
  //       a number, a distance to the right half of the unit circle.
  //     max
  //       a number, a distance to the left half of the unit circle.
  //
  this.interaction = new Slide(this.capturer, this.element)
}
