const Item = require('../Item')

const Edge = function (width) {
  // @Edge([width])
  //
  // Inherits FrameComponent
  //
  // Edge is an instance class for an empty div with border or background style.
  // It can be used as a line. Lines can visually connect components.
  // Use setPoints(start, end) to place the edge.
  //
  // Example:
  // ```
  // const edge = tapspace.createEdge(2)
  // edge.addClass('my-edge')
  // edgeGroup.addChild(edge)
  // edge.setPoints(itemA.atBottomMid(), itemB.atTopMid())
  // ...
  // .my-edge {
  //   background: linear-gradient(0.25turn, black, white);
  //   border-top: 2px dotted black;
  // }
  // ```
  //
  // Parameters:
  //   width
  //     optional integer, default 1.
  //
  // Under the hood:
  // The width determines how much we need to offset the edge element
  // so that the edge endpoints match the middle of the border.
  //

  // Create a new element.
  const element = document.createElement('div')

  // Handle width argument
  if (typeof width === 'number') {
    this.width = Math.abs(width)
  } else {
    this.width = 1
  }

  // Default length, just something for the app developer to see when
  // forgot to set end points.
  const defaultLength = 100

  Item.call(this, element)

  // Add class name
  element.classList.add('affine-edge')

  // Rectangular size
  this.setSize({ w: defaultLength, h: this.width })

  // Store edge end points. Initially unit * default.
  this.startpoint = { x: 0, y: 0, z: 0 } // constant, always at space origin.
  this.endpoint = { x: defaultLength, y: 0, z: 0 }
}

module.exports = Edge
const proto = Edge.prototype
proto.isEdge = true

// Inherit
Object.assign(proto, Item.prototype)

// Functions
Edge.create = require('./create')(Edge)

// Overriding methods
proto.getBoundingBox = require('./getBoundingBox')

// Edge methods
proto.atStart = require('./atStart')
proto.atEnd = require('./atEnd')
proto.getLength = require('./getLength')
proto.renderTransform = require('./renderTransform')
proto.setPoints = require('./setPoints')
proto.setWidth = require('./setWidth')
proto.trimPoints = require('./trimPoints')
