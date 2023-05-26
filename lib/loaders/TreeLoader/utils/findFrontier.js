module.exports = (spaces, tracker, id, maxDepth) => {
  // Find successor spaces in a tree.
  // Successors include the leaf spaces and spaces that
  // have missing children, given that their tree distance
  // from the given root space id maxDepth or less.
  //
  // Parameters:
  //   spaces
  //     an object: id -> space
  //   tracker
  //     a function: space -> array of childId
  //   id
  //     a string
  //   maxDepth
  //     a number
  //
  // Return
  //   an array: { id, space, depth }
  //

  if (!spaces[id]) {
    return []
  }

  if (maxDepth < 0) {
    return []
  }

  // Collect results here.
  const frontier = []

  // Iteration cursors. Space ids. Their spaces must exist.
  const cursors = [id]

  // Limit depth.
  const depths = [0]

  while (cursors.length > 0) {
    const cursor = cursors.pop()
    const depth = depths.pop()
    const cursorSpace = spaces[cursor]
    // Assert cursorSpace exists.
    const childIds = tracker(cursorSpace)
    // Find if all children exist
    for (let i = 0; i < childIds.length; i += 1) {
      const cid = childIds[i]
      const childSpace = spaces[cid]
      if (childSpace) {
        // Continue search with children if they are not too far.
        if (depth < maxDepth) {
          cursors.push(cid)
          depths.push(depth + 1)
        }
      } else {
        // Not every children is open: cursor belongs to the frontier.
        frontier.push({
          id: cursor,
          space: cursorSpace,
          depth: depth
        })
      }
    }
  }

  return frontier
}
