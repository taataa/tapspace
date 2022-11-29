const Frame = require('../Frame')
const cssBorder = require('./utils/cssBorder')
const completeBorderOptions = require('./utils/completeBorderOptions')

const AffineEdge = function (border) {
  // @Edge(border)
  //
  // Inherits Frame
  //
  // Edge is an instance class for a div with one visible border.
  // It can be used as a line. Lines can visually connect components.
  // Edge is rendered in 3D. Use setPoints(start, end) to place the edge.
  //
  // Parameters:
  //   border, either string or object.
  //     string
  //       A CSS border style e.g. '1px solid #ff2200'
  //     object with properties
  //       width: number or string, e.g. 10 or '10px' or '1em'
  //       style: string, e.g. 'solid'
  //       color: string, e.g. 'red'
  //

  // Handle border argument
  border = completeBorderOptions(border)

  // Create a new element.
  const element = document.createElement('div')

  // Set class name
  element.className = 'affine-element affine-edge'

  // Set given border style
  element.style.borderTop = cssBorder.stringify(border)
  // Store stroke width etc
  this.border = border

  // Default length, just something for the app developer to debug when
  // no end points are set.
  const defaultLength = 100

  Frame.call(this, element)
  this.setSize({ w: defaultLength, h: border.width })

  // Store edge end points. Initially unit * default.
  this.startpoint = { x: 0, y: 0, z: 0 } // constant, always at plane origin.
  this.endpoint = { x: defaultLength, y: 0, z: 0 }
}

// Inherit
const proto = AffineEdge.prototype
Object.assign(proto, Frame.prototype)
module.exports = AffineEdge

proto.atStart = require('./atStart')
proto.atEnd = require('./atEnd')
proto.getLength = require('./getLength')
proto.renderTransform = require('./renderTransform')
proto.setPoints = require('./setPoints')
