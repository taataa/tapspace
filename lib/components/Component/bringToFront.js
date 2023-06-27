module.exports = function () {
  // @Component:bringToFront()
  //
  // Remove this element and reinsert it as the last child.
  //
  // Return
  //   this, for chaining
  //

  this.element.parentNode.appendChild(this.element)

  return this
}
