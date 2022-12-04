const fine = require('affineplane')
const point2 = fine.point2

module.exports = (pointers) => {
  // Get the mean point of the gesture.
  //
  // Parameters:
  //   pointers
  //     an object: id -> point2
  //
  // Return
  //   a point2 { x, y }
  //
  return point2.mean(Object.values(pointers))
}
