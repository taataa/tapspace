module.exports = function (control, position) {
  // tapspace.components.AbstractView:addControl(control, position)
  //
  // Add new control to the viewport.
  // Controls do not move with the space.
  //
  // Parameters
  //   control
  //     an AbstractControl
  //   position
  //     optional {x,y} on the viewport or a Point in space.
  //
  // Return
  //   this, for chaining
  //

  this.controls.addChild(control, position)

  return this
}
