module.exports = function (z, placement) {
  // Get or create a layer at z distance.
  //
  // Parameters:
  //   z
  //     optional number. Default 0.
  //   placement
  //     optional object with properties:
  //       position
  //         { x, y } on the viewport or a Point. Default at the view origin.
  //       rotation
  //         a number, radians. Optional. Default 0.
  //       scale
  //         a number, multiplier. Optional. Default 1.
  //
  // TODO maybe z is part of placement?
  //

  // Default parameters
  if (typeof z !== 'number') {
    z = 0
  }

  // Find existing layer if any
  const layer = this.findLayer(z)

  if (layer) {
    // TODO move existing layer based on the placement?
    return layer
  }

  const newLayer = this.addLayer(z, placement)

  return newLayer
}
