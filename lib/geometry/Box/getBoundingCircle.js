const fine = require('affineplane')
const box3 = fine.box3

module.exports = (Sphere) => {
  return function () {
    // @Box:getBoundingCircle()
    //
    // Get the spherical boundary of the box.
    // The sphere center equals the box center.
    //
    // Return:
    //   a Sphere
    //
    const sp = box3.getSphere(this.box)
    return new Sphere(this.basis, sp)
  }
}
