module.exports = function (z, tolerance) {
  // Find a layer. Return null if no layer at this depth.
  //
  // Parameters
  //   z
  //     required number. The layer depth.
  //   tolerance
  //     optional number. Default 0. Pick the first layer within
  //     ..this depth tolerance
  //
  // Return
  //   Layer component at or near z.
  //   Null if no layers found.
  //

  // Find the layer. Undefined if not found.
  const layer = this.layers.find((layer) => {
    if (z - tolerance <= layer.z && layer.z <= z + tolerance) {
      return true
    }
    return false
  })

  // Convert undefined to null.
  if (layer) {
    return layer
  }
  return null
}
