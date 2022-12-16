module.exports = function () {
  // @Basis:getElement()
  //
  // Get the affine element of the node. Each Basis has one affine element.
  // This element can wrap further affine or non-affine content.
  //
  // Return
  //   an HTMLElement
  //
  // Complexity:
  //   O(1)
  //
  return this.element
}
