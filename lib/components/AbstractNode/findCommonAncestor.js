module.exports = function (node) {
  // Find lowest common affine ancestor of self and the given node.
  //
  // Parameters:
  //   node
  //     an AbstractNode
  //
  // Return
  //   an AbstractNode. Null if no common ancestor is found.
  //
  // Note that the result might not be a true ancestor:
  // - If the given node is a predecessor of self, then self is returned
  //   ..and vice versa.
  // - If the given node equals self, then self is returned.
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
  let el = self.element
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
  // in the other. In other words, self is predecessor of the node
  // or vice versa.
  return common.affine
}
