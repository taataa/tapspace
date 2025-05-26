module.exports = function (control) {
  // @Viewport:removeControl(control)
  //
  // Remove control from the viewport. If control is not present, already removed, or nullish, then do nothing.
  //
  // Parameters
  //   control
  //     a ViewportControl
  //
  // Return
  //   this, for chaining
  //

  if (!control) {
    // Fail silently.
    return this
  }

  // Unregister all listeners.
  if (control.unbind) {
    control.unbind()
  }

  const controlElem = control.element
  const containerElem = this.controls.element

  // Test if already removed because otherwise DOM removeChild throws an exception.
  // We want to embrace idempotency, thus fail silently instead of exception. See #178.
  if (controlElem.parentElement === containerElem) {
    // Detach from document
    containerElem.removeChild(controlElem)
  }

  return this
}
