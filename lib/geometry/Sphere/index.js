const sphere3 = require('affineplane').sphere3

const Sphere = function (basis, sphere) {
  // @Sphere(basis, sphere)
  //
  // A sphere in space. A sphere has origin point and a radius.
  // Spheres do not have orientation and therefore lack
  // the at() method for example.
  //
  // Parameters
  //   basis
  //     a BasisElement
  //   sphere
  //     a sphere3 object `{ x, y, z, r }`.
  //

  // Debug
  if (!sphere3.validate(sphere)) {
    throw new Error('Invalid sphere argument')
  }

  this.basis = basis
  this.sphere = sphere
}

const proto = Sphere.prototype
module.exports = Sphere
proto.isSphere = true

// Class functions
Sphere.fromPoints = require('./fromPoints')(Sphere)

// Methods
proto.atCenter = require('./atCenter')
proto.atMid = proto.atCenter
proto.changeBasis = require('./changeBasis')
proto.detectCollision = require('./detectCollision')
proto.fromPoints = require('./fromPoints')
proto.getBoundingBox = require('./getBoundingBox')
proto.getDepth = require('./getDiameter')
proto.getDiameter = proto.getDepth
proto.getHeight = proto.getDiameter
proto.getRadius = require('./getRadius')
proto.getRaw = require('./getRaw')
proto.getSize = require('./getSize')
proto.getVolume = require('./getVolume')
proto.getWidth = proto.getDiameter
proto.offset = require('./offset')
// proto.rotateAroundLine = require('./rotateAroundLine')
// proto.rotateBy = require('./rotateBy')
proto.scaleBy = require('./scaleBy')
proto.transitRaw = require('./transitRaw')
proto.translateBy = require('./translateBy')

// Methods with circular dependencies.
const getBoundingBox = require('./getBoundingBox')
Sphere.patchCircular = (Box) => {
  proto.getBoundingBox = getBoundingBox(Box)
  delete Sphere.patchCircular
}
