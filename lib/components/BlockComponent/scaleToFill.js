module.exports = function (size, pivot) {
  // @BlockComponent:scaleToFill(size[, pivot])
  //
  // Scale this block so that it can contain the given size.
  // A rectangle of the given size could just fit inside the scaled block.
  // The scaling is performed about a pivot point.
  // See BlockComponent:scaleToFit to fit inside a size.
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

  // Pick larger in order to fill.
  const scaleFactor = Math.max(widthFactor, heightFactor)

  this.scaleBy(scaleFactor, pivot)

  return this
}
