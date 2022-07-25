module.exports = function (control, placement) {
  // tapspace.components.AbstractView:addControl(control, placement)
  //
  // Add new control to the viewport.
  // Controls do not move with the space.
  //
  // Parameters
  //   control
  //     an AbstractControl
  //   placement
  //     an optional object with properties
  //       position
  //         {x,y} on the viewport or a Point in space.
  //
  // Return
  //   this, for chaining
  //

  this.controls.add(control, placement)

  return this
}
