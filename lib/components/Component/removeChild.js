module.exports = function (child) {
  // @Component:removeChild(child)
  //
  // Remove the specified child component from this component.
  // You might want to call `child.off()` to also remove any active listeners.
  //
  // Parameters
  //   child
  //     a Component, the component to remove.
  //
  // Return
  //   this, for chaining
  //

  let childEl
  if (child.nodeType) {
    // Allow HTMLElement
    childEl = child
  } else {
    // Assume a Component
    childEl = child.element
  }

  // Detach from document
  this.element.removeChild(childEl)

  return this
}
