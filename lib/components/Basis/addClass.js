module.exports = function (className, c2, c3) {
  // @Basis:addClass(className[, secondClass[, thirdClass]])
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
  this.element.classList.add(className, c2, c3)

  return this
}
