const Frame = require('../Frame')

const MIN_ANGLE = Math.PI / 18
const MAX_ANGLE = Math.PI

const Arc = function (angle, border) {
  // @Arc(angle, border)
  //
  // Inherits Frame
  //
  // Arc is an instance class for curved edges.
  // Use Arc to visually connect components.
  // Arc is rendered flat (2D). Use setPoints(start, end) to place the arc.
  //
  // Parameters:
  //   angle
  //     a number, the arc angle in radians.
  //     .. A half-circle has the arc angle of π.
  //     .. A straight line has the arc angle of 0.
  //     .. Negative angle makes the arc curve to counter-clockwise direction.
  //     .. Not all angles can be rendered and might be capped to the nearest
  //     .. applicable angle.
  //   border
  //     optional string, the border style. The default is '1px solid black'.
  //
  // **Under the hood:**
  // Arc is implemented by a rounded-border div that is cropped to display
  // only a portion of its circle edge by a container with overflow:hidden.
  //

  // Prevent small angles to limit the circle element size.
  const absAngle = Math.abs(angle)
  const limitedAbsAngle = Math.min(Math.max(absAngle, MIN_ANGLE), MAX_ANGLE)
  this.angle = Math.sign(angle) * limitedAbsAngle

  // Create a stencil to crop a circle
  const stencil = document.createElement('div')
  // Requires overflow:hidden
  stencil.classList.add('affine-arc')

  // Create a circle that will be cropped.
  const circle = document.createElement('div')
  circle.style.position = 'absolute'
  circle.style.boxSizing = 'border-box'
  circle.style.border = (border || '1px solid black')
  // Init position
  circle.style.left = '0px' // x
  circle.style.top = '-50px' // y
  circle.style.borderRadius = '50px'
  circle.style.width = '100px'
  circle.style.height = '100px'

  stencil.appendChild(circle)
  this.circle = circle

  // The stencil becomes this.element
  Frame.call(this, stencil)

  // Init rectangular size
  this.setSize({ w: 100, h: 50 })
}

module.exports = Arc
const proto = Arc.prototype
proto.isArc = true

// Inherit
Object.assign(proto, Frame.prototype)

// Functions
Arc.create = require('./create')(Arc)

// Methods
proto.atStart = proto.atBottomLeft
proto.atEnd = proto.atBottomRight
// TODO proto.getLength = require('./getLength')
proto.getRadius = require('./getRadius')
// TODO proto.renderTransform = require('./renderTransform')
proto.setPoints = require('./setPoints')
