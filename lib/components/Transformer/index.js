const Component = require('../Component')

const Transformer = function (element) {
  // @Transformer(element)
  //
  // Inherits Component
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
  Component.call(this, element)

  // The position of the gravity on the element. The anchor point.
  // Inheriting classes can call setAnchor in their constructors.
  this.anchor = { x: 0, y: 0, z: 0 }
}

module.exports = Transformer
const proto = Transformer.prototype
proto.isTransformer = true

// Inherit
Object.assign(proto, Component.prototype)

// Methods
proto.atAnchor = require('./atAnchor')
proto.getDistanceTo = require('./getDistanceTo')
proto.getPosition = require('./getPosition')
proto.getVectorTo = require('./getVectorTo')
proto.match = require('./match')
proto.matchBasis = require('./matchBasis')
proto.matchPoint = require('./matchPoint')
proto.moveTo = require('./translateTo')
proto.renderTransform = require('./renderTransform')
// proto.resetTransformer? moveTo with default params handles already.
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
