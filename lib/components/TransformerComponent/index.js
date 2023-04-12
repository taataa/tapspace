const BasisComponent = require('../BasisComponent')

const TransformerComponent = function (element) {
  // @TransformerComponent(element)
  //
  // Inherits BasisComponent
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
  BasisComponent.call(this, element)

  // The position of the gravity on the element. The anchor point.
  // Inheriting classes can call setAnchor in their constructors.
  this.anchor = { x: 0, y: 0, z: 0 }

  // To be able to stop CSS transitions and remove listeners gracefully,
  // we must remember possible handler functions.
  // See :animate and :animateOnce.
  this.ontransitionend = null
}

module.exports = TransformerComponent
const proto = TransformerComponent.prototype
proto.isTransformerComponent = true

// Inherit
Object.assign(proto, BasisComponent.prototype)

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
proto.matchPoint = require('./matchPoint')
proto.moveTo = require('./translateTo')
proto.renderTransform = require('./renderTransform')
// proto.resetTransformerComponent? moveTo with default params handles already.
proto.rotateBy = require('./rotateBy')
proto.rotateByDegrees = require('./rotateByDegrees')
// TODO proto.rotateTo
proto.scaleBy = require('./scaleBy')
proto.setAnchor = require('./setAnchor')
proto.setBasis = require('./setBasis')
proto.setOrientation = require('./setOrientation')
proto.setScale = require('./setScale')
// TODO proto.snap that moves the element based on the best snapping pair
proto.snapGrid = require('./snapGrid')
proto.snapPixels = require('./snapPixels')
proto.transformBy = require('./transformBy')
proto.transformTo = proto.setBasis
proto.translateBy = require('./translateBy')
proto.translateTo = proto.moveTo