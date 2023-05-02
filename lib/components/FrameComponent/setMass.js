module.exports = function (mass) {
  // @FrameComponent:setMass(mass)
  //
  // Make component solid or non-solid.
  // Non-solid objects can be passed through.
  // This affects the viewport navigation.
  //
  // Parameters:
  //   mass
  //     a boolean
  //
  // Return
  //   this, for chaining
  //

  if (isFinite(mass)) {
    this.mass = Math.abs(mass)
  } else {
    this.mass = Infinity
  }

  return this
}
