const factor = Math.PI / 180

module.exports = function (degrees, pivot) {
  // @TransformerComponent:rotateByDegrees(degrees, pivot)
  //
  // Rotate the element by degrees around z axis of an optional pivot point.
  //
  // Parameters:
  //   degrees
  //     a number, delta angle to rotate.
  //   pivot
  //     optional Point. Rotation is performed around this point.
  //     .. Defaults to the transformer anchor.
  //
  // Return
  //   this, for chaining
  //
  const rads = degrees * factor
  return this.rotateBy(rads, pivot)
}
