module.exports = function () {
  // @Basis:getLeaves()
  //
  // All affine leaf descendants in a list. A leaf has no own children.
  // The affine leaves must be connected to this node in the subset of DOM.
  // An affine leaf may have non-affine children in DOM.
  //
  // Return
  //   array of Basis
  //
  // Complexity:
  //   O(n) where n is the number of nodes in the affine tree.
  //
  const offspring = this.getDescendants()
  return offspring.filter((node) => {
    return node.isLeaf()
  })
}
