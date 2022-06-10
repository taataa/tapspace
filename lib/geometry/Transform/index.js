
const Transform = function (basis, a, b, x, y) {
  // Parameters
  //   basis
  //     a Component
  //   a
  //     a number or a tran2
  //   b
  //     number
  //   x
  //     number
  //   y
  //     number
  //
  this.basis = basis
  if (typeof a === 'object') {
    this.a = a.a
    this.b = a.b
    this.x = a.x
    this.y = a.y
  } else {
    this.a = a
    this.b = b
    this.x = x
    this.y = y
  }
}

module.exports = Transform
const proto = Transform.prototype

// Class methods
Transform.createFromParams = require('./createFromParams')
Transform.estimate = require('./estimate')

// Instance methods
proto.getTranslation = require('./getTranslation')
proto.inverse = require('./inverse')
proto.invert = proto.inverse
proto.projectTo = require('./projectTo')
