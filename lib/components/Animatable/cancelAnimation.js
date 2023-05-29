module.exports = function () {
  // @Animatable:cancelAnimation
  //
  // Cancel current animation.
  //
  // Return
  //   this, for chaining
  //

  // TODO should emit idle or not?
  if (this.ontransitionend) {
    this.ontransitionend()
  }

  return this
}
