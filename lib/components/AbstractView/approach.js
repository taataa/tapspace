module.exports = function (factor, target) {
  // tapspace.components.AbstractView:approach(factor, target)
  //
  // Move the camera towards or away the given target point so that
  // the apparent scale change at the point depth matches the given factor.
  // This method of navigation nicely slows down when the target comes close
  // and prevents viewport flying through the target.
  //
  // Useful especially in perspective viewports.
  // In orthogonal mode, the method is equivalent to AbstractView:scaleBy.
  //
  // Parameters:
  //   factor
  //     a number, the scale multiplier
  //   target
  //     a Point
  //
  // Return
  //   this, for chaining
  //
  if (this.isPerspective()) {
    // The current difference vector from camera to the target.
    const delta = this.atCamera().vectorTo(target)
    // The desired difference vector.
    const desired = delta.scaleBy(factor)
    // A trip the viewport must take in order to reach the desired diff.:
    // delta + X = desired <=> X = desired - delta
    const trip = desired.difference(delta)
    // Travel
    this.translateBy(trip)
  } else {
    // Orthogonal
    this.scaleBy(factor, target)
  }

  return this
}
