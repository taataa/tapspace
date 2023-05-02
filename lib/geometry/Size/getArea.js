const Area = require('../Area')

module.exports = function () {
  // @Size:getArea()
  //
  // Get the area of the size.
  //
  // Return
  //   an Area
  //

  const area = this.size.w * this.size.h

  return new Area(this.basis, area)
}
