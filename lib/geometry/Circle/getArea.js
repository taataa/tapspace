const circle3 = require('affineplane').circle3
const Area = require('../Area')

module.exports = function () {
  // @Circle:getArea()
  //
  // Get the area of the circle.
  //
  // Return
  //   an Area
  //
  const ar = circle3.area(this.circle)
  return new Area(this.basis, ar)
}
