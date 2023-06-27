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

  this.element.parentNode.prepend(this.element)

  return this
}
