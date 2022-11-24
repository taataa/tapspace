const Plane = require('../Plane')
const Space = require('../Space')
const Controls = require('./Controls')

const AbstractView = function (element) {
  // tapspace.components.AbstractView(element)
  //
  // Inherits Plane
  //
  // Base class for views. A view is a viewport to space.
  // At the same time, it is a rectangular component that can be moved
  // around in the space. Unlike other space components, viewport width
  // height cannot be changed via Tapspace API. Instead, the size is
  // determined by the container element and the host app CSS rules.
  //
  // Parameters
  //   element
  //     a HTMLElement, becomes the viewport.
  //
  // The viewport transformation to the element are inverted to its children
  // instead of the element itself. This, combined to overflow styles
  // set by affine-viewport CSS class, creates an illusion of a viewport
  // to a 2D space.
  //

  Plane.call(this, element)

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

  // The mode of projection is stored as perspective number.
  // The number tells the distance of the camera from the viewport.
  // The null perspective means infinite distance and orthogonal projection.
  this.cameraDistance = null
}

const proto = AbstractView.prototype
Object.assign(proto, Plane.prototype)
module.exports = AbstractView

// Disable the add method.
// Ensure root planes and controls are added properly via other methods.
proto.add = function () { throw new Error('Not available for viewport') }
proto.addChild = function () { throw new Error('Not available for viewport') }
proto.addControl = require('./addControl')

proto.approach = require('./approach')

proto.atBottomLeft = require('./atBottomLeft')
proto.atBottomMid = require('./atBottomMid')
proto.atBottomRight = require('./atBottomRight')

proto.atCamera = require('./atCamera')
proto.atCenter = require('./atMidMid')

proto.atMidLeft = require('./atMidLeft')
proto.atMidMid = proto.atCenter
proto.atMid = proto.atCenter
proto.atMidRight = require('./atMidRight')

// Overwrite atNorm to give integer pixels.
proto.atNorm = require('./atNorm')

// Method to convert page coordinates to viewport.
proto.atPage = require('./atPage')
proto.atPageFn = require('./atPageFn')

proto.atTopLeft = require('./atTopLeft')
proto.atTopMid = require('./atTopMid')
proto.atTopRight = require('./atTopRight')

proto.findMostDistant = require('./findMostDistant')

proto.getControls = require('./getControls')

proto.getElementAt = require('./getElementAt')

proto.getHeight = require('./getHeight')

// Overwrite AbstractFrame:getSize to read the size from DOM.
proto.getSize = require('./getSize')

proto.getSpace = require('./getSpace')

proto.getWidth = require('./getWidth')

proto.isPerspective = require('./isPerspective')
proto.moveCenterTo = require('./moveCenterTo')
proto.orthogonal = require('./orthogonal')
proto.perspective = require('./perspective')

// Overwrite Plane:renderTransform to apply to each root plane.
proto.renderTransform = require('./renderTransform')

// Overwrite Plane:rotateBy to apply to each root plane.
proto.rotateBy = require('./rotateBy')

// Overwrite Plane:scaleBy to apply to each root plane.
proto.scaleBy = require('./scaleBy')

// TODO MAYBE proto.setBackgroundDepth

// Overwrite Plane:snapPixels to apply to each root plane.
proto.snapPixels = require('./snapPixels')

// Transit points to page coordinates.
proto.toPage = require('./toPage')

// Overwrite Plane:transformBy to apply to each root plane.
proto.transformBy = require('./transformBy')

// Overwrite Plane:translateBy to apply to each root plane.
proto.translateBy = require('./translateBy')
