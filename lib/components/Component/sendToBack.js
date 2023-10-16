module.exports = function () {
  // @Component:sendToBack()
  //
  // Remove this element and reinsert it as the first child.
  // The element will be rendered first and thus becomes the farthest and
  // and bottommost.
  //
  // Return
  //   this, for chaining
  //

  const parentNode = this.element.parentNode

  // Reinsert only when necessary to prevent flicker from rendering.
  if (parentNode.firstChild !== this.element) {
    parentNode.prepend(this.element)
  }

  return this
}
