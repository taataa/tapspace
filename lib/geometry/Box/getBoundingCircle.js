const fine = require('affineplane')
const box2 = fine.box2

module.exports = (Circle) => {
  return function () {
    // @Box:getBoundingCircle()
    //
    // Get the circle boundary of the rectangular box front.
    // The circle center equals the box front center.
    //
    // Return:
    //   a Circle
    //
    const c = box2.getCircle(this.box)
    c.z = this.box.z // patch
    return new Circle(this.basis, c)
  }
}
