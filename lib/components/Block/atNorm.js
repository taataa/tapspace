module.exports = function () {
  // @Block:atNorm(rx, ry)
  //
  // **Subclasses must override this method.**
  //
  // Get a point by coordinates that are normalized over the width and height
  // so that (0,0) means the top-left and (1,1) the bottom-right corner.
  //
  // Parameters:
  //   rx
  //     a number
  //   ry
  //     a number
  //
  // Return:
  //   a Point
  //
  throw new Error('Subclass must override atNorm method.')
}
