module.exports = function (isSolid) {
  // @FrameComponent:setSolidity(isSolid)
  //
  // Make component solid or non-solid.
  // This affects the viewport navigation.
  // Non-solid objects have zero mass and can be passed through.
  // Solid objects have infinite mass and cannot be passed through.
  // See also FrameComponent:setMass
  //
  // Parameters:
  //   isSolid
  //     a boolean
  //
  // Return
  //   this, for chaining
  //

  if (isSolid) {
    this.mass = Infinity
  } else {
    this.mass = 0
  }

  return this
}
