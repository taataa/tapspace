const projectionBetween = require('../dom/projectionBetween')
const proj = require('../geom/proj')

const Transform = function (basis, a, b, x, y) {
  // Parameters
  //   basis
  //     HTMLElement or AffineElement
  //   a
  //     number
  //   b
  //     number
  //   x
  //     number
  //   y
  //     number
  //
  if (basis.el) {
    basis = basis.el
  }
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
  //     rotate
  //       number, radians. Optional, default 0.
  //     scale
  //       number, multiplier. Optional, default 1.
  //     translate
  //       vec2, { x, y }. Optional, default { x: 0, y: 0 }.
  //
  params = Object.assign({
    rotate: 0,
    scale: 1,
    translate: { x: 0, y: 0 }
  }, params)

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
  const tr = proj.tran2(pr, this)
  return new Transform(newBasis, tr.a, tr.b, tr.x, tr.y)
}

module.exports = Transform
