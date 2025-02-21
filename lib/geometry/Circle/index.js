const Circle = function (basis, circle) {
  // @Circle(basis, circle)
  //
  // A circle tensor. The circle is a flat round shape in 3D space.
  //
  // Parameters
  //   basis
  //     a Component
  //   circle
  //     a circle3 object `{ x, y, z, r }`
  //
  this.basis = basis
  this.circle = circle
}

module.exports = Circle
const proto = Circle.prototype
proto.isCircle = true

// Class functions
Circle.fromPoints = require('./fromPoints')(Circle)

// Methods
proto.almostEqual = require('./almostEqual')
proto.atArc = require('./atArc')
proto.atCenter = require('./atCenter')
proto.atMid = proto.atCenter
proto.changeBasis = require('./changeBasis')
proto.detectCollision = require('./detectCollision')
proto.equal = require('./equal')
proto.getArea = require('./getArea')
proto.getCollisionArea = require('./getCollisionArea')
proto.getDiameter = require('./getDiameter')
proto.getHeight = proto.getDiameter
proto.getRadius = require('./getRadius')
proto.getRaw = require('./getRaw')
proto.getSize = require('./getSize')
proto.getWidth = proto.getDiameter
proto.offset = require('./offset')
proto.scaleBy = require('./scaleBy')
proto.transitRaw = require('./transitRaw')
proto.translateBy = require('./translateBy')

// Methods with circular dependencies.
const getBoundingBox = require('./getBoundingBox')
Circle.patchCircular = (Box) => {
  proto.getBoundingBox = getBoundingBox(Box)
  delete Circle.patchCircular
}
