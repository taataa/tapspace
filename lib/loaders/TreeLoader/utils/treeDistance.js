module.exports = (spaces, backtracker, ida, idb) => {
  // Get distance between spaces in a tree.
  //
  // Parameters:
  //   spaces
  //     an object of id -> space
  //   backtracker
  //     a function (childId) -> parentId
  //   ida
  //     a string, a space id
  //   idb
  //     a string, a space id
  //
  // Return
  //   a number, Infinity if not connected
  //

  if (!spaces[ida] || !spaces[idb]) {
    return Infinity
  }

  if (ida === idb) {
    return 0
  }

  // Find common root

  // Find existing ancestors for A
  const arra = []
  let ancId = ida
  let ancSpace = spaces[ida]
  while (ancId && ancSpace) {
    arra.push(ancId)
    ancId = backtracker(ancId, ancSpace)
    ancSpace = spaces[ancId]
  }

  // Find existing ancestors for B
  const arrb = []
  ancId = idb
  ancSpace = spaces[idb]
  while (ancId && ancSpace) {
    arrb.push(ancId)
    ancId = backtracker(ancId, ancSpace)
    ancSpace = spaces[ancId]
  }

  // Are the roots the same
  let ia = arra.pop()
  let ib = arrb.pop()
  if (ia !== ib) {
    // No common ancestor.
    return Infinity
  }

  // Roots are the same.
  // The root is the first candidate for nearest common.

  // Climb towards leaves one by one until ids differ.
  while (arra.length > 0 && arrb.length > 0) {
    ia = arra.pop()
    ib = arrb.pop()
    if (ia !== ib) {
      // The candidate is the closest ancestor.
      return arra.length + arrb.length + 2
    }
    // else still the same but closer. The new candidate: ia
  }

  // The while-loop can exit here if arra or arrb is popped empty.
  // This happens when the first item in one of the arrays is found
  // in the other. In other words, self is successor of the node
  // or vice versa.
  return arra.length + arrb.length
}
