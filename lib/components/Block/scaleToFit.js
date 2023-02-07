module.exports = function (size, pivot) {
  // @Block:scaleToFit(size[, pivot])
  //
  // Scale this block to the largest scale that can still fit inside the size.
  // In other words, a rectangle of the given size could just be able
  // to contain the scaled block.
  // The scaling is performed about a pivot point.
  // See also Block:scaleToFill
  //
  // Parameters:
  //   size
  //     a Size
  //   pivot
  //     optional Point, defaults to the transform origin (=anchor)
  //
  // Return
  //   this, for chaining
  //

  // Normalize
  if (size.transitRaw) {
    size = size.transitRaw(this)
  }

  const blockSize = this.getSize().size

  // Compute how much to dilate the box in order to match the given size.
  const widthFactor = size.w / blockSize.w
  const heightFactor = size.h / blockSize.h

  // Pick the smaller in order to fit inside.
  const scaleFactor = Math.min(widthFactor, heightFactor)

  this.scaleBy(scaleFactor, pivot)

  return this
}
