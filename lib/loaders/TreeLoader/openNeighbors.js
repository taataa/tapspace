module.exports = function (id, depth, data) {
  // @TreeLoader:openNeighbors(id, depth[, data])
  //
  // Open parents and children until max depth.
  // Relies on an 'open' event handler calling TreeLoader:openNeighbors.
  //
  // Parameters:
  //   id
  //     a string, the first node ID.
  //   depth
  //     a number, the desired opening depth. For example `2`.
  //   data
  //     optional object, the context data passed to 'open' event.
  //
  // Emits:
  //   open
  //     { id, space, depth, data }
  //     Loader emits for each child and the parent space.
  //

  // Stop recursion. Handles also undefined like default zero.
  if (depth <= 0) {
    return
  }

  // Space may not exist, yet.
  const space = this.spaces[id]
  if (!space) {
    return
  }

  // Default context
  if (!data) {
    data = {}
  }

  // It is a good habit to gather events before emitting,
  // in order to avoid side-effects from emissions.
  const emits = []

  // Open children of all frontier spaces.
  const frontier = this.getFrontier(id, space, depth - 1)
  frontier.forEach(finding => {
    const childIds = this.tracker(finding.id, finding.space)
    for (let i = 0; i < childIds.length; i += 1) {
      const childId = childIds[i]
      // Open only non-opened children.
      if (!this.spaces[childId]) {
        emits.push({
          id: childId,
          parentId: finding.id,
          // propagation depth formula:
          // neighborhood radius - frontier distance - child dist from frontier
          depth: depth - finding.depth - 1,
          data: data
        })
      }
    }
  })

  // Open parent, siblings and their neighborhoods of all backtier spaces.
  const backtier = this.getBacktier(id, space, depth)
  backtier.forEach(finding => {
    // Open non-opened parent.
    const parentId = this.backtracker(finding.id, finding.space)
    if (!this.spaces[parentId]) {
      emits.push({
        id: parentId,
        childId: finding.id,
        depth: depth - finding.depth - 1,
        data: data
      })
    }
    // Open non-opened children.
    const childIds = this.tracker(finding.id, finding.space)
    for (let i = 0; i < childIds.length; i += 1) {
      const childId = childIds[i]
      if (!this.spaces[childId]) {
        emits.push({
          id: childId,
          parentId: finding.id,
          depth: depth - finding.depth - 1,
          data: data
        })
      }
    }
  })

  for (let i = 0; i < emits.length; i += 1) {
    const ev = emits[i]
    this.emit('open', ev)
  }
}
