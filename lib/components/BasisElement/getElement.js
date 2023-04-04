module.exports = function () {
  // @BasisElement:getElement()
  //
  // Get the affine HTML element of the node.
  // Each BasisElement has one HTML element.
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
