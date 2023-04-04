module.exports = function (className) {
  // @BasisElement:addClass(className[, secondClass[, ...]])
  //
  // Add one or more CSS class name into the affine element, up to three.
  // This is equivalent to `basis.element.classList.add(className)`.
  //
  // Example:
  //   `item.addClass('myitem', 'banner')`
  //
  // Parameters:
  //   className
  //     a string, for example 'my-item'
  //
  // Return
  //   this, for chaining
  //
  // Complexity:
  //   O(1)
  //

  const list = this.element.classList
  list.add.apply(list, arguments)

  return this
}
