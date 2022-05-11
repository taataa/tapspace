const proj2 = require('affineplane').proj2
const projectionBetween = require('../../dom/projectionBetween')

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

const proto = Transform.prototype

Transform.createFromParams = (params) => {
  // Create transform in intuitive way with human-readable parameters.
  //
  // Parameters:
  //   params
  //     basis
  //       HTMLElement, required.
  //     rotate
  //       number, radians. Optional, default 0.
  //     scale
  //       number, multiplier. Optional, default 1.
  //     translate
  //       vec2, { x, y }. Optional, default { x: 0, y: 0 }.
  //
  // Return
  //   a Transform
  //

  // Required parameters
  if (typeof params.basis !== 'object') {
    throw new Error('Basis element is required')
  }
  // Optional parameters
  params = Object.assign({
    basis: params.basis,
    rotate: 0,
    scale: 1,
    translate: { x: 0, y: 0 }
  }, params)

  // Construct Transform
  const a = params.scale * Math.cos(params.rotate)
  const b = params.scale * Math.sin(params.rotate)
  const xy = params.translate

  return new Transform(params.basis, a, b, xy.x, xy.y)
}

Transform.estimate = (basis, params) => {
  throw new Error('not implemented yet')
}

proto.projectTo = function (newBasis) {
  const pr = projectionBetween(this.basis, newBasis)
  const tr = proj2.tran2(pr, this)
  return new Transform(newBasis, tr.a, tr.b, tr.x, tr.y)
}

module.exports = Transform
