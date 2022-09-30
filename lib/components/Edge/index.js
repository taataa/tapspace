const AbstractFrame = require('../AbstractFrame')
const cssBorder = require('./utils/cssBorder')
const completeBorderOptions = require('./utils/completeBorderOptions')

const AffineEdge = function (border, opts) {
  // tapspace.components.Edge(border, opts)
  //
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

  // Store edge end points. Initially unit.
  this.startpoint = { x: 0, y: 0, z: 0 } // always at edge plane origin.
  this.endpoint = { x: 1, y: 0, z: 0 }
}

// Inherit
const proto = AffineEdge.prototype
Object.assign(proto, AbstractFrame.prototype)
module.exports = AffineEdge

proto.atStart = require('./atStart')
proto.atEnd = require('./atEnd')
proto.getLength = require('./getLength')
proto.renderTransform = require('./renderTransform')
proto.setPoints = require('./setPoints')
