const Area = require('../Area')

module.exports = function () {
  // @Box:getArea()
  //
  // Get the area of the front face of the box.
  //
  // Return
  //   an Area
  //

  const area = this.box.w * this.box.h

  return new Area(this.basis, area)
}
