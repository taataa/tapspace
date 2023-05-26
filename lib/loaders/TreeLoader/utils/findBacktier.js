module.exports = (spaces, backer, tracker, id, maxDepth) => {
  // Find a frontier towards the parent for the given root space id.
  // Finds ancestors and siblings but avoids finding children of the root.
  //
  // Parameters:
  //   spaces
  //   backer
  //   tracker
  //   id
  //     a string, the root space id
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

  // Track and limit depth.
  const depths = [0]

  // Track already visited to avoid propagating back-and-forth.
  // Visiting means that it has been a cursor.
  const visits = {}
  visits[id] = true

  while (cursors.length > 0) {
    const cursor = cursors.pop()
    const depth = depths.pop()
    const cursorSpace = spaces[cursor]
    // Assert cursorSpace exists.

    // Prevent expansion to root's children.
    let nextIds = [backer(cursor)]
    if (cursor !== id) {
      const childIds = tracker(cursorSpace)
      nextIds = nextIds.concat(childIds)
    }

    // Avoid expanding where already visited.
    nextIds = nextIds.filter((nid) => {
      if (visits[nid]) {
        return false
      }
      return true
    })

    // Find if all nexts exist
    for (let i = 0; i < nextIds.length; i += 1) {
      const nid = nextIds[i]

      const nextSpace = spaces[nid]
      if (nextSpace) {
        // Continue search with the next if they are not too far.
        if (depth < maxDepth) {
          cursors.push(nid)
          depths.push(depth + 1)
          visits[nid] = true
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
