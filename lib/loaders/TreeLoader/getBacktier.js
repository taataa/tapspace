module.exports = function (id, depth) {
  // @TreeLoader:getBacktier(id, depth)
  //
  // Find a frontier towards the parent for the given root space id.
  // Find ancestors and siblings but avoid finding children of the root.
  //
  // Parameters:
  //   id
  //     a string, the root space id
  //   depth
  //     a number, the maximum search distance from the root space.
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

  // Track and limit depth.
  const depths = [0]

  // Track already visited to avoid propagating back-and-forth.
  // Visiting means that it has been a cursor.
  const visits = {}
  visits[id] = true

  while (cursors.length > 0) {
    const cursor = cursors.pop()
    const cursorDepth = depths.pop()
    const cursorSpace = this.spaces[cursor]
    // Assert cursorSpace exists.

    // Prevent expansion to root's children.
    let nextIds = [this.backtracker(cursor, cursorSpace)]
    if (cursor !== id) {
      const childIds = this.tracker(cursor, cursorSpace)
      nextIds = nextIds.concat(childIds)
    }

    // Avoid expanding where already visited.
    nextIds = nextIds.filter((nid) => {
      if (visits[nid]) {
        return false
      }
      return true
    })

    // Prevent cursor being pushed to frontier multiple times.
    let cursorInFrontier = false
    // Find if all nexts exist
    for (let i = 0; i < nextIds.length; i += 1) {
      const nid = nextIds[i]

      const nextSpace = this.spaces[nid]
      if (nextSpace) {
        // Continue search with the next if they are not too far.
        if (cursorDepth < depth) {
          cursors.push(nid)
          depths.push(cursorDepth + 1)
          visits[nid] = true
        }
      } else if (!cursorInFrontier) {
        // Not every children is open: cursor belongs to the frontier.
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
