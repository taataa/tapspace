const AbstractFrame = require('../AbstractFrame')
const Space = require('./Space')
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

  // TODO Keep track of layer elements instead of getLayers
  // NOTE premature optimisation
  // Mutable array in DOM order.
  // this.layers = []

  // Init container for layers - the Space
  this.space = new Space()
  this.element.appendChild(this.space.element)

  // Init container for controls.
  // It is important to keep it after layers in DOM
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
// Ensure layers and controls are added properly via other methods.
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

// Transit points to page coordinates.
proto.toPage = require('./toPage')

// Overwrite AbstractPlane:transformBy to apply to each layer.
proto.transformBy = require('./transformBy')

// Special transform method to transform the space content.
proto.transformLayersBy = require('./transformLayersBy')

// Overwrite AbstractPlane:renderTransform to apply to each layer.
proto.renderTransform = require('./renderTransform')

// Overwrite AbstractPlane:rotateBy to apply to each layer.
proto.rotateBy = require('./rotateBy')

// Overwrite AbstractPlane:scaleBy to apply to each layer.
proto.scaleBy = require('./scaleBy')

// Overwrite AbstractFrame:setSize to allow relative sizes.
proto.setSize = require('./setSize')

// Overwrite AbstractPlane:snapPixels to apply to each layer.
proto.snapPixels = require('./snapPixels')

// Overwrite AbstractPlane:translateBy to apply to each layer.
proto.translateBy = require('./translateBy')
