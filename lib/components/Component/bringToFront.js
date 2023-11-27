module.exports = function () {
  // @Component:bringToFront()
  //
  // Remove this element and reinsert it as the last child.
  //
  // This method reorders elements in DOM. That can cause elements to lose
  // their hover state in some browsers. See issue #173 for details.
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
