module.exports = function (node) {
  // @Basis:findCommonAncestor(node)
  //
  // Find lowest common affine ancestor of this and the given node.
  // If a mother has two children and the father of the mother is
  // the grandfather of the children, then the lowest common ancestor
  // for the children is the mother. If the mother has a sister from
  // the same father, then the grandfather is the lowest common ancestor
  // of the sister and one of the children.
  //
  // Parameters:
  //   node
  //     a Basis
  //
  // Return
  //   a Basis. Null if no common ancestor is found.
  //
  // Complexity:
  //   O(d) where d is the depth of the affine tree.
  //
  // Note that the result might not be a true ancestor:
  // - If this is an ancestor of the given node, then this is returned.
  // - If the given node is an ancestor of this node, then the given node
  //   ..is returned.
  // - If this node equals the given node, then this is returned.
  //

  // For algorithmic comparison, see note 2022-04-01-19
  //
  // See also https://en.wikipedia.org/wiki/Lowest_common_ancestor
  //

  // TODO optimise with Node.compareDocumentPosition()
  // TODO optimise with Node.contains()
  // TODO see https://www.baeldung.com/cs/tree-lowest-common-ancestor

  // Shortcircuit self
  if (this === node) {
    return this
  }

  // TODO Shortcircuit if roots

  // Find affine ancestors of self, self first.
  const arra = []
  let el = this.element
  while (el && el.affine) {
    arra.push(el)
    el = el.parentElement
  }

  // Find affine ancestors of the node, the node first.
  const arrb = []
  el = node.element
  while (el && el.affine) {
    arrb.push(el)
    el = el.parentElement
  }

  // Are the roots the same
  let ia = arra.pop()
  let ib = arrb.pop()
  if (ia !== ib) {
    // No common root. No affine ancestor found.
    return null
  }

  // Roots are the same. Make the root the first candidate
  let common = ia

  // Climb towards leaves one by one until elements differ.
  while (arra.length > 0 && arrb.length > 0) {
    ia = arra.pop()
    ib = arrb.pop()
    if (ia === ib) {
      // Update candidate
      common = ia
    } else {
      // The candidate is the closest ancestor.
      return common.affine
    }
  }

  // The while-loop can exit here if arra or arrb is popped empty.
  // This happens when the first item in one of the arrays is found
  // in the other. In other words, self is successor of the node
  // or vice versa.
  return common.affine
}
