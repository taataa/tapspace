const Basis = require('../Basis')

const Plane = function (element) {
  // @Plane(element)
  //
  // Abstract class for affine components that behave like a transformable
  // 2D plane in 3D space.
  //
  // Parameters:
  //   element
  //     a HTMLElement
  //

  // Debug
  if (!element) {
    throw new Error('Element does not exist')
  }
  // TODO check that given element is not already affine

  // Inherit from Basis
  Basis.call(this, element)

  // The position of the gravity on the element. The anchor point.
  // Inheriting classes can call setAnchor in their constructors.
  this.anchor = { x: 0, y: 0, z: 0 }
}

module.exports = Plane
const proto = Plane.prototype

// Inherit from Basis
Object.assign(proto, Basis.prototype)

// Functions
Plane.create = require('./create')(Plane)

// Methods
proto.animate = require('./animate')
proto.at = require('./at')
proto.atAnchor = require('./atAnchor')
proto.getDirection = require('./getDirection')
proto.getDistanceTo = require('./getDistanceTo')
// TODO proto.getOrientation
proto.getPosition = require('./getPosition')
proto.getRotation = proto.getDirection
proto.getScale = require('./getScale')
proto.getVectorTo = require('./getVectorTo')
proto.match = require('./match')
proto.matchOrientation = require('./matchOrientation')
proto.matchPoints = require('./matchPoints')
proto.matchPosition = require('./matchPosition')
proto.matchScale = require('./matchScale')
proto.moveTo = require('./translateTo')
proto.renderTransform = require('./renderTransform')
// proto.resetPlane? moveTo with default params handles already.
proto.rotateBy = require('./rotateBy')
proto.rotateByDegrees = require('./rotateByDegrees')
// TODO proto.rotateTo
proto.scaleBy = require('./scaleBy')
proto.setAnchor = require('./setAnchor')
proto.setScale = require('./setScale')
// TODO proto.snap that moves the element based on the best snapping pair
proto.snapGrid = require('./snapGrid')
proto.snapPixels = require('./snapPixels')
proto.transformBy = require('./transformBy')
proto.translateBy = require('./translateBy')
proto.translateTo = proto.moveTo
