const Basis = require('../Basis')

const Transformer = function (element) {
  // @Transformer(element)
  //
  // Inherits Basis
  //
  // Abstract class for space components that need to be transformable,
  // meaning that they can be moved around, rotated, and scaled.
  //
  // Parameters:
  //   element
  //     an HTMLElement
  //

  // Debug
  if (!element) {
    throw new Error('Element does not exist')
  }
  // TODO check that given element is not already affine

  // Inherit
  Basis.call(this, element)

  // The position of the gravity on the element. The anchor point.
  // Inheriting classes can call setAnchor in their constructors.
  this.anchor = { x: 0, y: 0, z: 0 }

  // To be able to stop CSS transitions and remove listeners gracefully,
  // we must remember possible handler functions.
  // See :animate and :animateOnce.
  this.ontransitionend = null
}

module.exports = Transformer
const proto = Transformer.prototype
proto.isTransformer = true

// Inherit
Object.assign(proto, Basis.prototype)

// Methods
proto.animate = require('./animate')
proto.animateOnce = require('./animateOnce')
proto.atAnchor = require('./atAnchor')
proto.getDirection = require('./getDirection')
proto.getDistanceTo = require('./getDistanceTo')
proto.getPosition = require('./getPosition')
proto.getRotation = proto.getDirection
proto.getScale = require('./getScale')
proto.getVectorTo = require('./getVectorTo')
proto.match = require('./match')
proto.matchPoints = require('./matchPoints')
proto.matchPosition = require('./matchPosition')
proto.matchScale = require('./matchScale')
proto.moveTo = require('./translateTo')
proto.renderTransform = require('./renderTransform')
// proto.resetTransformer? moveTo with default params handles already.
proto.rotateBy = require('./rotateBy')
proto.rotateByDegrees = require('./rotateByDegrees')
// TODO proto.rotateTo
proto.scaleBy = require('./scaleBy')
proto.setAnchor = require('./setAnchor')
proto.setOrientation = require('./setOrientation')
proto.setScale = require('./setScale')
// TODO proto.snap that moves the element based on the best snapping pair
proto.snapGrid = require('./snapGrid')
proto.snapPixels = require('./snapPixels')
proto.transformBy = require('./transformBy')
proto.translateBy = require('./translateBy')
proto.translateTo = proto.moveTo
