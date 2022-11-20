module.exports = function (className) {
  // tapspace.components.AbstractNode:addClass
  //
  // Add a CSS class name into the affine wrapper element.
  //
  // Parameters:
  //   className
  //     a string, for example 'my-item'
  //
  // Return
  //   this, for chaining
  //
  this.element.classList.add(className)

  return this
}
