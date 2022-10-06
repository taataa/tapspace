const Direction = require('../Direction') // circular
const Distance = require('../Distance') // circular

const Vector = function (basis, vec) {
  // tapspace.geometry.Vector(basis, vec)
  //
  // Creates a vector that can be transited between planes.
  // The vector has length and direction but no position.
  //
  // Parameters
  //   basis
  //   vec
  //     a vec3 object {x,y,z}
  //
  this.basis = basis
  this.vec = vec

  // Support 2d
  if (!vec.z) {
    this.vec.z = 0
  }
}

module.exports = Vector
const proto = Vector.prototype

// Class functions
Vector.fromAverage = require('./fromAverage')(Vector)

// Methods
proto.add = require('./add')
proto.almostEqual = require('./almostEqual')
proto.changeBasis = require('./changeBasis')
proto.copy = require('./copy')
proto.cross = require('./cross')
proto.difference = require('./difference')
proto.dot = require('./dot')
proto.getDirection = require('./getDirection')(Direction)
proto.getDistance = require('./getDistance')(Distance)
proto.multiply = require('./scaleBy')
proto.negate = require('./negate')
proto.norm = proto.getDistance
proto.normalize = require('./normalize')
proto.rotateBy = require('./rotateBy')
proto.scaleBy = proto.multiply
proto.scaleTo = proto.normalize
proto.subtract = proto.difference
proto.transformBy = require('./transformBy')
