module.exports = function () {
  // tapspace.components.AbstractNode:getDescendants()
  //
  // All affine descendants in a list, including the children of this node.
  // The affine descendants must be connected in affine part of DOM.
  //
  // Return
  //   array of AbstractNode
  //
  let arr = []
  const children = this.getChildren()
  for (let i = 0; i < children.length; i += 1) {
    const child = children[i]
    arr = arr.concat(child, child.getDescendants())
  }
  return arr
}
