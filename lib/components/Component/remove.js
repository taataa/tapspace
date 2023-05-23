module.exports = function () {
  // @Component:remove()
  //
  // Remove this component from its parent, if any.
  // If you also need to remove active listeners, call `component.off()`.
  //
  // Return
  //   this, for chaining
  //

  // Detach from document
  const elem = this.element
  const parent = elem.parentElement

  if (parent) {
    parent.removeChild(elem)
  }

  return this
}
