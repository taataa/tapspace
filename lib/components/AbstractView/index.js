// AbstractView
// Inherits AbstractFrame
//
// The viewport transformation to the element are inverted to its children
// instead of the element itself. This, combined to overflow styles
// set by affine-viewport CSS class, creates an illusion of a viewport
// to a 2D space.
//
const AbstractFrame = require('../AbstractFrame')
const Space = require('./Space')
const Controls = require('./Controls')

const AbstractView = function (element, opts) {
  // Parameters
  //   element
  //     HTMLElement
  //   opts
  //     anchor
  //       { x, y } on the viewport. Optional. Default at the viewport middle.
  //     size
  //       a { width, height }
  //     interaction
  //       pannable
  //         boolean, default true
  //       scalable
  //         boolean, default true
  //       rotatable
  //         boolean, default false
  //       wheelable
  //         boolean, default true
  //

  // Default anchor to the viewport middle.
  if (!opts) {
    opts = {}
  }
  if (!opts.anchor) {
    let w, h
    // If size given, it overrules the element dimensions,
    // because the element will be that size soon.
    if (opts.size) {
      w = opts.size.width
      h = opts.size.height
    } else {
      w = element.offsetWidth
      h = element.offsetHeight
    }
    opts = Object.assign({
      anchor: { x: w / 2, y: h / 2 }
    }, opts)
  }

  // DEBUG console.log('View constructor opts.anchor', opts.anchor)

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
  // to its children, the projection to the parent is
  // always the identity transform.

  // TODO enable MouseConverter. Unlike touch events, mousemove events do not
  // respect the original target. To make dragging small elements a lot easier,
  // let viewport capture all mouse events and re-emit them as rat events
  // on their original targets. See note 2022-04-10

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
proto.addLayer = require('./addLayer')

proto.findLayer = require('./findLayer')
proto.getControls = require('./getControls')
proto.getLayers = require('./getLayers')

// Get or create layer
proto.layer = require('./layer')

// Overwrite AbstractPlane:transformBy
proto.transformBy = require('./transformBy')

proto.transformLayersBy = require('./transformLayersBy')

// Overwrite AbstractPlane:scaleBy
proto.scaleBy = require('./scaleBy')

// Overwrite AbstractPlane:translateBy
proto.translateBy = require('./translateBy')
