const helm3 = require('affineplane').helm3

module.exports = (Transform) => {
  return (params) => {
    // @Transform:fromFeatures(params)
    //
    // Create transform in intuitive way from human-readable parameters.
    //
    // Parameters:
    //   params, object with properties:
    //     basis
    //       a Basis, required.
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

    // Construct
    const h = helm3.fromFeatures({
      dilation: params.scale,
      rotation: params.rotate,
      translation: params.translate
    })

    return new Transform(params.basis, h)
  }
}
