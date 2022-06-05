module.exports = (params) => {
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

  const Transform = this.constructor
  return new Transform(params.basis, a, b, xy.x, xy.y)
}
