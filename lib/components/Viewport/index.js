const BlockComponent = require('../BlockComponent')
const Hyperspace = require('../Hyperspace')
const Interactive = require('../Interactive')
const ViewportControls = require('../ViewportControls')

const Viewport = function (element) {
  // @Viewport(element)
  //
  // Inherits BlockComponent and Interactive
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
  BlockComponent.call(this, element)
  Interactive.call(this)

  // Ensure the element has class affine-viewport.
  // The class name might be set already. Class name duplicate is harmless.
  element.classList.add('affine-viewport')

  // Init container for root spaces - the Hyperspace
  this.hyperspace = new Hyperspace(this)
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

  // Anchor at the middle
  this.setAnchor(this.atMidMid())

  // Make viewport responsive by default
  this.responsive(true) // TODO this.setResizeAction('realing')
  this.on('resize', (ev) => {
    this.controls.adapt(ev)
  })

  this.on('idle', () => {
    // Idle is emitted after viewport transformations and animations end.
    // Viewport transformations are applied to hyperspace for
    // smooth animation with single element (hyperspace) instead of
    // animating each space separately.
    // After the transformations and animations end, hyperspace commits
    // its accumulated transformation to spaces in order to prevent
    // floating point underflow and overflow.
    this.hyperspace.commit()
  })
}

const proto = Viewport.prototype
module.exports = Viewport
proto.isViewport = true

// Inherit
Object.assign(proto, BlockComponent.prototype)
Object.assign(proto, Interactive.prototype)

// Class methods
Viewport.create = require('./create')(Viewport)

// Overriding methods
proto.add = require('./addChild')
proto.addChild = proto.add
proto.animateOnce = require('./animateOnce')
proto.atNorm = require('./atNorm')
proto.focus = require('./focus')
proto.getHeight = require('./getHeight')
proto.getSize = require('./getSize')
proto.getWidth = require('./getWidth')
proto.moveTo = require('./translateTo')
proto.normAt = require('./normAt')
proto.prependChild = require('./prependChild')
proto.removeChild = require('./removeChild')
proto.renderTransform = require('./renderTransform')
proto.requestIdle = require('./requestIdle')
proto.rotateBy = require('./rotateBy')
proto.scaleBy = require('./scaleBy')
proto.setOrientation = require('./setOrientation')
proto.snapPixels = require('./snapPixels')
proto.transformBy = require('./transformBy')
proto.translateBy = require('./translateBy')
proto.translateTo = proto.moveTo

// Viewport methods
proto.addControl = require('./addControl')
proto.atPage = require('./atPage')
proto.atPageFn = require('./atPageFn')
proto.balanceOrientation = require('./balanceOrientation')
proto.findSingular = require('./findSingular')
proto.getAspectRatio = require('./getAspectRatio')
proto.getControls = require('./getControls')
proto.getHyperspace = require('./getHyperspace')
proto.getItemAt = require('./getItemAt')
proto.getNavigationBasis = require('./getNavigationBasis')
proto.getSpaces = require('./getSpaces')
proto.limitTo = require('./limitTo')
proto.measureAll = require('./measureAll')
proto.measureDilation = require('./measureDilation')
proto.measureGroup = require('./measureGroup')
proto.measureMany = require('./measureMany')
proto.measureNearest = require('./measureNearest')
proto.measureOne = require('./measureOne')
proto.removeControl = require('./removeControl')
proto.setMeasureMode = require('./setMeasureMode')
proto.setNavigationBasis = require('./setNavigationBasis')
proto.toPage = require('./toPage')
proto.zoomTo = require('./zoomTo')
proto.zoomToFill = require('./zoomToFill')
proto.zoomToFit = require('./zoomToFit')

// Interaction methods
proto.pannable = require('./pannable')
proto.responsive = require('./responsive')
proto.rotatable = require('./rotatable')
proto.rotateable = proto.rotatable
proto.scalable = require('./zoomable')
proto.scaleable = proto.scalable
proto.tappable = require('./tappable')
proto.zoomable = proto.scalable
