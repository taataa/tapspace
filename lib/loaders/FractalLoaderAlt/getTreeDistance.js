module.exports = function (ida, idb) {
  // Get distance in tree.
  //
  // Return
  //   a number, -1 of not connected
  //

  if (!this.spaces[ida] || !this.spaces[idb]) {
    return -1
  }

  if (ida === idb) {
    return 0
  }

  // Find common root

  // Find existing ancestors for A
  const arra = []
  let ancId = ida
  while (ancId && this.spaces[ancId]) {
    arra.push(ancId)
    ancId = this.backer(ancId)
  }

  // Find existing ancestors for B
  const arrb = []
  ancId = idb
  while (ancId && this.spaces[ancId]) {
    arrb.push(ancId)
    ancId = this.backer(ancId)
  }

  // Are the roots the same
  let ia = arra.pop()
  let ib = arrb.pop()
  if (ia !== ib) {
    // No common ancestor.
    return -1
  }

  // Roots are the same.
  // Make the root the first candidate.
  let common = ia

  // Climb towards leaves one by one until ids differ.
  while (arra.length > 0 && arrb.length > 0) {
    ia = arra.pop()
    ib = arrb.pop()
    if (ia === ib) {
      // Still same but closer. Update the candidate.
      common = ia
    } else {
      // The candidate is the closest ancestor.
      return arra.length + arrb.length + 2
    }
  }

  // The while-loop can exit here if arra or arrb is popped empty.
  // This happens when the first item in one of the arrays is found
  // in the other. In other words, self is successor of the node
  // or vice versa.
  return arra.length + arrb.length
}
