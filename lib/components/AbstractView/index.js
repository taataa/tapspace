const AbstractFrame = require('../AbstractFrame')
const Space = require('../Space')
const Controls = require('./Controls')

const AbstractView = function (element, opts) {
  // tapspace.components.AbstractView(element, opts)
  //
  // Inherits tapspace.components.AbstractFrame
  //
  // Base class for views.
  //
  //
  // Parameters
  //   element
  //     HTMLElement
  //   opts
  //     anchor
  //       { x, y } on the viewport. Optional. Default at {x:0,y:0}.
  //     size
  //       a { width, height }
  //
  // The viewport transformation to the element are inverted to its children
  // instead of the element itself. This, combined to overflow styles
  // set by affine-viewport CSS class, creates an illusion of a viewport
  // to a 2D space.
  //

  if (!opts) {
    opts = {}
  }

  // Default size makes the viewport 100% wide and 400px tall.
  if (!opts.size) {
    opts.size = {
      width: '100%',
      height: '400px'
    }
  }

  AbstractFrame.call(this, element, opts)

  // TODO Keep track of plane elements instead of getChildren
  // NOTE premature optimisation
  // Mutable array in DOM order.
  // this.planes = []

  // Init container for root planes - the Space
  this.space = new Space(this)
  this.element.appendChild(this.space.element)

  // Init container for controls.
  // It is important to keep it after root planes in DOM
  // so that space content does not cover the controls in any case.
  this.controls = new Controls()
  this.element.appendChild(this.controls.element)

  // Because transformations of the view are reflected
  // to its children, the transition to the parent is
  // always the identity transform.

  // this.element.addEventListener('transformed', (ev) => {})
  // TODO maybe listen additions and transformations,
  // TODO maybe capture them to queue, and
  // TODO maybe update their CSS at next animation frame.
}

const proto = AbstractView.prototype
Object.assign(proto, AbstractFrame.prototype)
module.exports = AbstractView

// Disable the add method.
// Ensure root planes and controls are added properly via other methods.
proto.add = function () { throw new Error('not implemented') }
proto.addControl = require('./addControl')

// Overwrite atNorm to give integer pixels.
proto.atNorm = require('./atNorm')

// Method to convert page coordinates to viewport.
proto.atPage = require('./atPage')
proto.atPageFn = require('./atPageFn')

proto.getControls = require('./getControls')

// Overwrite AbstractFrame:getSize to read the size from DOM.
proto.getSize = require('./getSize')

proto.getSpace = require('./getSpace')

// Transit points to page coordinates.
proto.toPage = require('./toPage')

// Overwrite AbstractPlane:transformBy to apply to each root plane.
proto.transformBy = require('./transformBy')

// Special transform method to transform the space content.
proto.transformPlanesBy = require('./transformPlanesBy')

// Overwrite AbstractPlane:renderTransform to apply to each root plane.
proto.renderTransform = require('./renderTransform')

// Overwrite AbstractPlane:rotateBy to apply to each root plane.
proto.rotateBy = require('./rotateBy')

// Overwrite AbstractPlane:scaleBy to apply to each root plane.
proto.scaleBy = require('./scaleBy')

// Overwrite AbstractFrame:setSize to allow relative sizes.
proto.setSize = require('./setSize')

// Overwrite AbstractPlane:snapPixels to apply to each root plane.
proto.snapPixels = require('./snapPixels')

// Overwrite AbstractPlane:translateBy to apply to each root plane.
proto.translateBy = require('./translateBy')
