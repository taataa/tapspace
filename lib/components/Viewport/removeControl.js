module.exports = function (control) {
  // @Viewport:removeControl(control)
  //
  // Remove control from the viewport.
  //
  // Parameters
  //   control
  //     a Control
  //
  // Return
  //   this, for chaining
  //

  // Unregister all listeners.
  if (control.unbind) {
    control.unbind()
  }

  // Detach from document
  const controlElem = control.element
  const containerElem = this.controls.element
  containerElem.removeChild(controlElem)

  return this
}
