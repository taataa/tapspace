
const Transform = function (basis, a, b, x, y) {
  // Parameters
  //   basis
  //     a Component
  //   a
  //     number
  //   b
  //     number
  //   x
  //     number
  //   y
  //     number
  //
  this.basis = basis
  this.a = a
  this.b = b
  this.x = x
  this.y = y
}

module.exports = Transform
const proto = Transform.prototype

// Class methods
Transform.createFromParams = require('./createFromParams')
Transform.estimate = require('./estimate')

// Instance methods
proto.getTranslation = require('./getTranslation')
proto.projectTo = require('./projectTo')
