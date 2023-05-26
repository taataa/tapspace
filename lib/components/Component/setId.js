module.exports = function (elemId) {
  // @Component:setId
  //
  // Set the affine element ID property.
  // This is equivalent to `basis.element.id = elemId`.
  //
  // Parameters:
  //   elemId
  //     a string, for example 'hero'
  //
  // Return
  //   this, for chaining
  //
  // Complexity:
  //   O(1)
  //
  this.element.id = elemId

  return this
}
