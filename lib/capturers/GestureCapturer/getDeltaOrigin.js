module.exports = (freedom, gestureMean) => {
  // Get the origin point for the transformation.
  //
  // Parameters:
  //   freedom
  //     a freedom object { type, pivot, angle }
  //   gestureMean
  //     a point2
  //
  // Return
  //   a point2 { x, y }
  //
  if (freedom.pivot) {
    return freedom.pivot
  }
  // Else use the pointers center
  return gestureMean
}
