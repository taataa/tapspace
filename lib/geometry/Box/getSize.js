const Size = require('../Size')

module.exports = function () {
  // @Box:getSize()
  //
  // Get box dimensions.
  //
  // Return
  //   a Size
  //

  // box3 is a size3 (has w,h,d properties)
  return new Size(this, this.box)
}
