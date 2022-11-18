const fine = require('affineplane')
const point2 = fine.point2

module.exports = (freedom, pointers) => {
  // Get the center point for the transformation.
  //
  // Parameters:
  //   freedom
  //     a freedom object { type, center, angle }
  //   pointers
  //     an object: id -> point2
  //
  // Return
  //   a point2 { x, y }
  //
  if (freedom.center) {
    return freedom.center
  }
  // Else use the pointers center
  return point2.mean(Object.values(pointers))
}
