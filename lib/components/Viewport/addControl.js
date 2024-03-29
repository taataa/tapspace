module.exports = function (control, position) {
  // @Viewport:addControl(control, position)
  //
  // Add new control to the viewport.
  // Controls do not move with the space.
  //
  // Parameters
  //   control
  //     a ViewportControl
  //   position
  //     optional {x,y} on the viewport or a Point.
  //
  // Return
  //   this, for chaining
  //

  this.controls.addChild(control, position)

  // Register the buttons to control this viewport.
  if (control.bind) {
    control.bind(this)
  }

  return this
}
