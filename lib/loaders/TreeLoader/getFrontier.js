module.exports = function (id, depth) {
  // @TreeLoader:getFrontier(id, depth)
  //
  // Find successor spaces in a tree.
  // Successors include the leaf spaces and spaces that
  // have missing children, given that their tree distance
  // from the given root space id maxDepth or less.
  //
  // Parameters:
  //   id
  //     a string, the root space id
  //   depth
  //     a number
  //
  // Return
  //   an array: { id, space, depth }
  //

  if (!this.spaces[id]) {
    return []
  }

  if (depth <= 0) {
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
    const cursorDepth = depths.pop()
    const cursorSpace = this.spaces[cursor]
    // Assert cursorSpace exists.
    const childIds = this.tracker(cursor, cursorSpace)

    // Prevent cursor being pushed to frontier multiple times.
    let cursorInFrontier = false
    // Find if all children exist
    for (let i = 0; i < childIds.length; i += 1) {
      const cid = childIds[i]
      const childSpace = spaces[cid]
      if (childSpace) {
        // Continue search with children if they are not too far.
        if (cursorDepth < depth) {
          cursors.push(cid)
          depths.push(cursorDepth + 1)
        }
      } else if (!cursorInFrontier) {
        // Not every child is open: cursor belongs to the frontier.
        frontier.push({
          id: cursor,
          space: cursorSpace,
          depth: cursorDepth
        })
        cursorInFrontier = true
      }
    }
  }

  return frontier
}
