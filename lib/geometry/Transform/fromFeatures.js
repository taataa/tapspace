module.exports = (params) => {
  // tapspace.geometry.Transform:fromFeatures(params)
  //
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
  //       a vec3, { x, y, z }. Optional, default { x: 0, y: 0, z: 0 }.
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
    translate: { x: 0, y: 0, z: 0 }
  }, params)

  // Construct Transform
  const a = params.scale * Math.cos(params.rotate)
  const b = params.scale * Math.sin(params.rotate)
  const xyz = params.translate

  const Transform = this.constructor
  return new Transform(params.basis, a, b, xyz.x, xyz.y, xyz.z)
}
