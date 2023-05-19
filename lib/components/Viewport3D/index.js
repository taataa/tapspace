const Viewport2D = require('../Viewport')

const Viewport3D = function (element) {
  // @Viewport3D(element)
  //
  // Inherits Viewport
  //
  // Perspective 3D viewport to space.
  // Consists of a camera point and an projection plane element.
  // You can posiion the camera point for different perspectives.
  //
  // Computationally and compatibility-wise Viewport2D is currently better
  // alternative for heavy applications.
  //
  // Parameters
  //   element
  //     an HTMLElement, becomes the viewport.
  //

  // Inherit
  Viewport2D.call(this, element)

  // Ensure the element has unique class name.
  element.classList.add('affine-viewport-3d')

  // The projection perspective is stored as number.
  // The number tells the distance of the camera from the viewport.
  // If you change this number, be sure to change it also in the stylesheet.
  // TODO Notice that this is a cache for the true value in CSS
  // TODO and because of this, debugging the perspective via dev toolbar
  // TODO does not work. Maybe read the true value instead of the cache?
  this.cameraDistance = 300

  // The navigation basis determines the default depth for interacting
  // with the viewport background.
  this.navigationBasis = this.hyperspace
}

const proto = Viewport3D.prototype
module.exports = Viewport3D
proto.isViewport3D = true

// Inherit
Object.assign(proto, Viewport3D.prototype)

// Class methods
// Viewport3D.create = require('./create')(Viewport3D)

// Overriding methods
// proto.measureAll = require('./measureAll')
// proto.measureDepth = require('./measureDepth')
// proto.measureDilation = require('./measureDilation')
// proto.measureGroup = require('./measureGroup')
// proto.measureOne = require('./measureOne')
// proto.moveTo = require('./translateTo')
// proto.normAt = require('./normAt')
// proto.renderTransform = require('./renderTransform')
// proto.rotateBy = require('./rotateBy')
// proto.scaleBy = require('./scaleBy')
// proto.setOrientation = require('./setOrientation')
// proto.snapPixels = require('./snapPixels')
// proto.transformBy = require('./transformBy')
// proto.translateBy = require('./translateBy')
// proto.translateTo = proto.moveTo

// Viewport methods
// proto.getDepth = require('./getDepth')
// proto.atCamera = require('./atCamera')
// proto.findMostDistant = require('./findMostDistant')
// proto.findNearRay = require('./findNearRay')
// proto.findWithinDistance = require('./findWithinDistance')
// proto.getCameraBasis = require('./getCameraBasis')
// proto.getCameraDistance = require('./getCameraDistance')
// proto.getFieldOfView = require('./getFieldOfView')
// proto.getNavigationBasis = require('./getNavigationBasis')
// proto.setCameraDistance = require('./setCameraDistance')
// proto.setMeasureMode = require('./setMeasureMode')
// proto.setNavigationBasis = require('./setNavigationBasis')
// proto.setPerspective = proto.setCameraDistance
// proto.zoomToFill = require('./zoomToFill')
// proto.zoomToFit = require('./zoomToFit')
