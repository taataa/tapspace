module.exports = function () {
  // tapspace.components.AbstractNode:isLeaf()
  //
  // Node is a leaf if it has no affine children.
  // Note that also a non-leaf can have non-affine children.
  //
  // Return
  //   a boolean, true if the node has no affine children.
  //
  return this.getChildren().length === 0
}
