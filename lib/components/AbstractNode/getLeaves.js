module.exports = function () {
  // tapspace.components.AbstractNode:getLeaves()
  //
  // All affine leaf descendants in a list. A leaf has no own children.
  // The affine leaves must be connected to this node in the subset of DOM.
  //
  // Return
  //   array of AbstractNode
  //
  const offspring = this.getDescendants()
  return offspring.filter((node) => {
    return node.isLeaf()
  })
}
