const Block = require('../Block')
const Space = require('../Space')
const Interactive = require('../Interactive')
const Controls = require('./Controls')

const Viewport = function (element) {
  // @Viewport(element)
  //
  // Inherits Block and Interactive
  //
  // A view is a viewport to space.
  // At the same time, it is a rectangular component that can be moved
  // around in the space. Unlike other space components, viewport width
  // height cannot be changed via Tapspace API. Instead, the size is
  // determined by the container element and the host app CSS rules.
  //
  // Parameters
  //   element
  //     an HTMLElement, becomes the viewport.
  //
  // When the viewport is transformed, it does not move on the page.
  // Instead, the space and its root planes are moved
  // in opposite direction. This, combined with overflow CSS styles,
  // creates an illusion of a viewport into space.
  //

  // Inherit
  Block.call(this, element)
  Interactive.call(this)

  // Ensure the element has class affine-viewport.
  // The class name might be set already. Class name duplicate is harmless.
  element.classList.add('affine-viewport')

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

const proto = Viewport.prototype
module.exports = Viewport

// Inherit
Object.assign(proto, Block.prototype)
Object.assign(proto, Interactive.prototype)

// Overriding methods
proto.add = function () { throw new Error('Not available for viewport') }
proto.addChild = function () { throw new Error('Not available for viewport') }
proto.animate = require('./animate')
proto.animateOnce = require('./animateOnce')
proto.atNorm = require('./atNorm')
proto.getHeight = require('./getHeight')
proto.getSize = require('./getSize')
proto.getWidth = require('./getWidth')
proto.moveTo = require('./translateTo')
proto.renderTransform = require('./renderTransform')
proto.rotateBy = require('./rotateBy')
proto.scaleBy = require('./scaleBy')
proto.snapPixels = require('./snapPixels')
proto.transformBy = require('./transformBy')
proto.translateBy = require('./translateBy')
proto.translateTo = proto.moveTo

/// Viewport methods
proto.addControl = require('./addControl')
proto.approach = require('./approach')
proto.atCamera = require('./atCamera')
proto.atPage = require('./atPage')
proto.atPageFn = require('./atPageFn')
proto.findMostDistant = require('./findMostDistant')
proto.focusTo = require('./focusTo')
proto.getCameraDistance = require('./getCameraDistance')
proto.getControls = require('./getControls')
proto.getItemAt = require('./getItemAt')
proto.getSpace = require('./getSpace')
proto.isPerspective = require('./isPerspective')
proto.measurePlanes = require('./measurePlanes')
proto.orthogonal = require('./orthogonal')
proto.perspective = require('./perspective')
// TODO MAYBE proto.setBackgroundDepth
proto.toPage = require('./toPage')

/// Interaction methods
proto.navigable = require('./navigable')
proto.pannable = require('./pannable')
proto.responsive = require('./responsive')
proto.rotatable = require('./rotatable')
proto.rotateable = proto.rotatable
proto.scalable = require('./zoomable')
proto.scaleable = proto.scalable
proto.zoomable = proto.scalable
