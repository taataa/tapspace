const Frame = require('../Frame')
const cssBorder = require('./dom/cssBorder')
const completeBorderOptions = require('./dom/completeBorderOptions')

const Edge = function (border) {
  // @Edge(border)
  //
  // Inherits Frame
  //
  // Edge is an instance class for a div with one visible border.
  // It can be used as a line. Lines can visually connect components.
  // Edge is rendered in 3D. Use setPoints(start, end) to place the edge.
  //
  // Example:
  // ```
  // const edge = tapspace.createEdge('2px solid white')
  // edgeGroup.addChild(edge)
  // edge.setPoints(itemA.atBottomMid(), itemB.atTopMid())
  // ```
  //
  // Parameters:
  //   border
  //     either string or object. This determines the style of border-top.
  //       string
  //         A CSS border style e.g. '1px solid #ff2200'
  //       object with properties
  //         width: number or string, e.g. 10 or '10px' or '1em'
  //         style: string, e.g. 'solid'
  //         color: string, e.g. 'red'
  //
  // **Under the hood:**
  // The border parameter is required in order to know the border width.
  // The pixel width determines how much we need to offset the edge element
  // so that the edge endpoints match the middle of the border.
  //

  // Handle border argument
  border = completeBorderOptions(border)

  // Create a new element.
  const element = document.createElement('div')

  // Set given border style
  element.style.borderTop = cssBorder.stringify(border)
  // Store stroke width etc
  this.border = border

  // Default length, just something for the app developer to debug when
  // no end points are set.
  const defaultLength = 100

  Frame.call(this, element)

  // Add class name
  element.classList.add('affine-edge')

  // Rectangular size
  this.setSize({ w: defaultLength, h: border.width })

  // Store edge end points. Initially unit * default.
  this.startpoint = { x: 0, y: 0, z: 0 } // constant, always at plane origin.
  this.endpoint = { x: defaultLength, y: 0, z: 0 }
}

module.exports = Edge
const proto = Edge.prototype
proto.isEdge = true

// Inherit
Object.assign(proto, Frame.prototype)

// Functions
Edge.create = require('./create')(Edge)

// Methods
proto.atStart = require('./atStart')
proto.atEnd = require('./atEnd')
proto.getLength = require('./getLength')
proto.renderTransform = require('./renderTransform')
proto.setPoints = require('./setPoints')
