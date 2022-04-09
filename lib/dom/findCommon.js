module.exports = (ea, eb) => {
  // Find closest common affine ancestor for two HTMLElements.
  //
  // Note that the result might not be a true ancestor:
  // - If eb is a predecessor of ea, then ea is returned.
  // - If ea equals eb, then ea is returned.
  //
  // For algorithmic comparison, see note 2022-04-01-19
  //
  // TODO optimise with Node.compareDocumentPosition()
  // TODO optimise with Node.contains()
  // TODO see https://www.baeldung.com/cs/tree-lowest-common-ancestor
  //
  if (ea === eb) {
    return ea
  }

  // Find affine ancestors of ea, ea first.
  const arra = []
  let el = ea
  while (el && el.affine) {
    arra.push(el)
    el = el.parentElement
  }

  // Find affine ancestors of eb, eb first.
  const arrb = []
  el = eb
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

  // Otherwise make the root the first candidate
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
      return common
    }
  }

  // The while-loop can exit here if arra or arrb is popped empty.
  // This happens when the first item in one of the arrays is found
  // in the other. In other words, ea is predecessor of eb or vice versa.
  return common
}
