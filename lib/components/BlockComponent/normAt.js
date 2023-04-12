module.exports = function (x, y) {
  // @BlockComponent:normAt(x, y)
  //
  // **Subclasses must override this method.**
  //
  // Get normalized coordinates from a point.
  // Practically this is the inverse of BlockComponent:atNorm.
  // For example, let a block have size (4, 4). Then the normalized coords
  // for the point (2, 1) are (0.5, 0.25).
  //
  // Parameters:
  //   x
  //     a number
  //   y
  //     a number
  //
  // Alternative parameters:
  //   point
  //     a Point
  //
  // Return
  //   a { rx, ry }. If size is zero, will return { rx: 0, ry: 0 }.
  //
  throw new Error('Subclass must override normAt method.')
}
