module.exports = function (isSolid) {
  // @FrameComponent:setSolidity(isSolid)
  //
  // Make component solid or non-solid.
  // Non-solid objects can be passed through.
  // This affects the viewport navigation.
  //
  // Parameters:
  //   isSolid
  //     a boolean
  //
  // Return
  //   this, for chaining
  //

  if (isSolid) {
    this.solid = true
  } else {
    this.solid = false
  }

  return this
}
