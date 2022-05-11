const proj2 = require('affineplane').proj2

module.exports = function () {
  // Get the position of the plane anchor on the parent.
  // Null if there is no parent.
  //
  // Return
  //   {x,y}. Null if no parent.
  //

  const par = this.getParent()

  if (par) {
    return proj2.point2(this.proj, this.anchor)
  }

  return null
}
