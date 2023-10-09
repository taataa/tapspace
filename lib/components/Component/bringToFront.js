module.exports = function () {
  // @Component:bringToFront()
  //
  // Remove this element and reinsert it as the last child.
  //
  // Return
  //   this, for chaining
  //

  const parentNode = this.element.parentNode

  // Reinsert only when necessary to prevent flicker from rendering.
  if (parentNode.lastChild !== this.element) {
    parentNode.appendChild(this.element)
  }

  return this
}
