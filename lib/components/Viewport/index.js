const Block = require('../Block')
const Hyperspace = require('../Hyperspace')
const Interactive = require('../Interactive')
const ViewportControls = require('../ViewportControls')

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
  // **Under the hood**
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

  // Init container for root spaces - the Hyperspace
  this.hyperspace = new Hyperspace()
  this.element.appendChild(this.hyperspace.element)

  // Init container for controls.
  // It is important to keep it after root planes in DOM
  // so that space content does not cover the controls in any case.
  this.controls = new ViewportControls()
  this.element.appendChild(this.controls.element)

  // Because transformations of the view are reflected
  // to its children, the transition to the parent is
  // always the identity transform.

  // this.element.addEventListener('transformed', (ev) => {})
  // TODO maybe listen additions and transformations,
  // TODO maybe capture them to queue, and
  // TODO maybe update their CSS at next animation frame.

  // Measure modes
  this.measureMode = null
  this.measureHandler = null

  // The projection perspective is stored as number.
  // The number tells the distance of the camera from the viewport.
  // If you change this number, be sure to change it also in the stylesheet.
  // TODO Notice that this is a cache for the true value in CSS
  // TODO and because of this, debugging the perspective via dev toolbar
  // TODO does not work. Maybe read the true value instead of the cache?
  this.cameraDistance = 300

  // Anchor at the middle
  this.setAnchor(this.atMidMid())
}

const proto = Viewport.prototype
module.exports = Viewport
proto.isViewport = true

// Inherit
Object.assign(proto, Block.prototype)
Object.assign(proto, Interactive.prototype)

// Class methods
Viewport.create = require('./create')(Viewport)

// Overriding methods
proto.add = require('./addChild')
proto.addChild = proto.add
proto.animate = require('./animate')
proto.animateOnce = require('./animateOnce')
proto.atNorm = require('./atNorm')
proto.focus = require('./focus')
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

// Viewport methods
proto.addControl = require('./addControl')
proto.approach = require('./approach')
proto.atCamera = require('./atCamera')
proto.atPage = require('./atPage')
proto.atPageFn = require('./atPageFn')
proto.findMostDistant = require('./findMostDistant')
proto.findWithinDistance = require('./findWithinDistance')
proto.fit = require('./fit')
proto.focusTo = require('./focusTo')
proto.getCameraDistance = require('./getCameraDistance')
proto.getControls = require('./getControls')
proto.getHyperspace = require('./getHyperspace')
proto.getItemAt = require('./getItemAt')
proto.measureAll = require('./measureAll')
proto.measureOne = require('./measureOne')
proto.removeControl = require('./removeControl')
proto.reorient = require('./reorient')
proto.rescale = require('./rescale')
// TODO proto.setBackgroundDepth
proto.setMeasureMode = require('./setMeasureMode')
proto.setPerspective = require('./setPerspective')
proto.toPage = require('./toPage')
proto.zoomToFill = require('./zoomToFill')
proto.zoomToFit = require('./zoomToFit')

// Interaction methods
proto.navigable = require('./navigable')
proto.pannable = require('./pannable')
proto.responsive = require('./responsive')
proto.rotatable = require('./rotatable')
proto.rotateable = proto.rotatable
proto.scalable = require('./zoomable')
proto.scaleable = proto.scalable
proto.zoomable = proto.scalable
