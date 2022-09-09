const point3 = require('affineplane').point3

module.exports = function () {
  // tapspace.components.AbstractPlane:getPosition()
  //
  // Get the position of the plane anchor, represented on the parent.
  // Null if there is no parent.
  //
  // Return
  //   {x,y,z}. Null if no parent.
  //

  const par = this.getParent()

  if (par) {
    return point3.transitFrom(this.anchor, this.tran)
  }

  return null
}
