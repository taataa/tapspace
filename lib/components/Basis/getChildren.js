module.exports = function () {
  // @Basis:getChildren()
  //
  // Get all affine child nodes of this node. The children are found via DOM.
  // The children in DOM that do not have affine properties will be skipped.
  //
  // Return
  //   array of Basis
  //
  // Complexity
  //   O(c) where c is the number of children
  //
  const el = this.element
  const result = []
  for (let i = 0; i < el.children.length; i += 1) {
    if (el.children[i].affine) {
      result.push(el.children[i].affine)
    }
  }
  return result
}
