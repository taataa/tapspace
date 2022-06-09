module.exports = function (z, placement) {
  // Get or create a layer at z distance.
  //
  // Parameters:
  //   z
  //     optional number
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
  const layer = this.findLayer(z)

  if (layer) {
    // TODO move existing layer based on the placement?
    return layer
  }

  const newLayer = this.addLayer(z, placement)

  return newLayer
}
