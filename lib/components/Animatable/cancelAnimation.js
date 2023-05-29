module.exports = function () {
  // @Animatable:cancelAnimation
  //
  // Cancel current animation.
  //
  // Return
  //   this, for chaining
  //

  if (this.ontransitionend) {
    this.ontransitionend()
  }

  return this
}
