const circle3 = require('affineplane').circle3
const equal = circle3.equal

module.exports = function (c) {
  // @Circle:equal(c)
  //
  // Test if this circle is strictly equal with the given circle c.
  // Strict equality requires that the circles are on the same basis
  // and have strictly equal radius and position.
  //
  // Parameters:
  //   c
  //     a Circle
  //
  // Return
  //   a boolean
  //
  if (!c || !c.basis) {
    return false
  }

  return this.basis === c.basis && equal(this.circle, c.circle)
}
