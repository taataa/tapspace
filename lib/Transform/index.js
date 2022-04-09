const projectionBetween = require('../dom/projectionBetween')
const proj = require('../geom/proj')

const Transform = function (basis, a, b, x, y) {
  // Parameters
  //   basis
  //     HTMLElement
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

const proto = Transform.prototype

Transform.createFromParams = (basis, params) => {
  // Create transform in intuitive way with human-readable parameters.
  //
  // Parameters:
  //   basis
  //     HTMLElement
  //   params
  //     translate
  //       vec2, { x, y }
  //     scale
  //       number, multiplier
  //     rotate
  //       number, radians
  //
  const a = params.scale * Math.cos(params.rotate)
  const b = params.scale * Math.sin(params.rotate)
  const xy = params.translate
  return new Transform(basis, a, b, xy.x, xy.y)
}

Transform.estimate = (basis, params) => {
  throw new Error('not implemented yet')
}

proto.projectTo = function (newBasis) {
  const pr = projectionBetween(this.basis, newBasis)
  const tr = proj.tran4(pr, this)
  return new Transform(newBasis, tr.a, tr.b, tr.x, tr.y)
}

module.exports = Transform
