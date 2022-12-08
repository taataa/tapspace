const Frame = require('../Frame')
const angle2 = require('affineplane').angle

const Arc = function (angle, border) {
  // @Arc(angle, border)
  //
  // Inherits Frame
  //
  // Arc is an instance class for curved edges.
  // Arc can be used to visually connect components.
  // Arc is rendered in 2D. Use setPoints(start, end) to place the arc.
  //
  // Parameters:
  //   angle
  //     a number, the arc angle in degrees. Half-circle has arc angle of 180.
  //     .. The angle must be within range [10, 180] or throws an error.
  //   border
  //     optional string, for example '1px solid black'.
  //
  // **Under the hood:**
  // Arc is implemented by a div that displays a portion of its child element
  // that has rounded border.
  //

  // Prevent small angles to limit the circle element size.
  if (angle < 10 || angle > 180) {
    throw new Error('Unsupported arc angle: ' + angle)
  }

  // Store in rads to avoid degToRad recomputation.
  this.angle = angle2.degToRad(angle)

  // Create a new element.
  const stencil = document.createElement('div')
  stencil.style.overflow = 'hidden'

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

  Frame.call(this, stencil)

  // Add class name
  stencil.classList.add('affine-arc')

  // Rectangular size
  this.setSize({ w: 100, h: 50 })

  // Store edge end points. Initially unit * default.
  // this.startpoint = { x: 0, y: 0, z: 0 } // constant, always at plane origin.
  // this.endpoint = { x: 100, y: 0, z: 0 }
}

module.exports = Arc
const proto = Arc.prototype

// Inherit
Object.assign(proto, Frame.prototype)

// Functions
Arc.create = require('./create')(Arc)

// Methods
proto.atStart = proto.atBottomLeft
proto.atEnd = proto.atBottomRight
// TODO proto.getLength = require('./getLength')
// TODO proto.renderTransform = require('./renderTransform')
proto.setPoints = require('./setPoints')
