module.exports = function (x, y) {
  // @Block:atToNorm(x, y)
  //
  // **Subclasses must override this method.**
  //
  // Get relative coordinates from absolute coordinates.
  // Practically this is the inverse of atNorm(rx, ry).
  // For example, let frame have size (4, 4). Then the relative coords
  // for the point (2, 1) are (0.5, 0.25).
  //
  // Parameters:
  //   x
  //     a number or a Point
  //   y
  //     a number
  //
  // Return
  //   a { rx, ry }. If size is zero, will return { rx: 0, ry: 0 }.
  //
  throw new Error('Subclass must override atToNorm method.')
}
