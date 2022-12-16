module.exports = function () {
  // @Basis:getAncestors()
  //
  // Get an array of affine ancestors of this node, ordered from
  // the immediate parent to the farthest ancestor, the immediate parent first.
  // The list of ancestors includes a space and a viewport, given that
  // the node is placed in a space.
  //
  // Return
  //   array of Basis
  //
  // Complexity
  //   O(d) where d is the depth of the affine tree
  //
  const arr = []
  let par = this.element.parentElement
  while (par && par.affine) {
    arr.push(par.affine)
    par = par.parentElement
  }
  return arr
}
