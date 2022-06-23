const AbstractFrame = require('../AbstractFrame')
const cssBorder = require('./cssBorder')
const completeBorderOptions = require('./completeBorderOptions')

const AffineEdge = function (border, opts) {
  // Edge is an instance class for a div with one visible border.
  // It can be used as a line that connects components.
  //
  // Parameters:
  //   border
  //     string
  //       A CSS border style e.g. '1px solid #ff2200'
  //     object with properties
  //       width: number or string, e.g. 10 or '10px' or '1em'
  //       style: string, e.g. 'solid'
  //       color: string, e.g. 'red'
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

  // Handle border argument
  border = completeBorderOptions(border)

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
  element.style.borderTop = cssBorder.stringify(border)

  // Default anchor
  // We should not let parent classes handle default values
  // because we must set anchor key even when value nullish.
  if (!opts.anchor) {
    opts.anchor = { x: 0, y: 0 }
  }

  // Default length
  if (!('length' in opts)) {
    opts.length = 100
  }

  AbstractFrame.call(this, element, {
    anchor: opts.anchor,
    size: { w: opts.length, h: border.width }
  })

  // Store stroke width etc
  this.border = border
}

// Inherit
const proto = AffineEdge.prototype
Object.assign(proto, AbstractFrame.prototype)
module.exports = AffineEdge

proto.atStart = function () {
  return this.atNorm(0, 0.5)
}

proto.atEnd = function () {
  return this.atNorm(1, 0.5)
}

proto.getLength = require('./getLength')

proto.setPoints = function (startPoint, endPoint) {
  // Set edge start and end points.
  // Note that this does not scale the edge.
  //
  // Parameters:
  //   startPoint
  //     a Point
  //   endPoint
  //     a Point
  //
  // Return
  //   this, for chaining
  //

  // First, find new length
  let dist = startPoint.distanceTo(endPoint)
  // Normalise on the edge
  dist = dist.projectTo(this)
  // Set the new length
  const len = dist.d
  const size = { w: len, h: this.border.width }
  this.setSize(size)
  // Find new endpoints.
  // No need to use Point for match.
  const start = { x: 0, y: size.h / 2 }
  const end = { x: len, y: size.h / 2 }
  // Move the edge so that the endpoints match the given points.
  this.match({
    sources: [start, end],
    targets: [startPoint, endPoint],
    estimator: 'TR'
  })
}
