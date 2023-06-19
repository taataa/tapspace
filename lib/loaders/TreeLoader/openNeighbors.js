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

  // DEBUG
  // console.log('openNeighbors at', id, 'to depth', depth)

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
  const frontier = this.getFrontier(id, depth - 1)
  // DEBUG
  // console.log('frontier', frontier)
  frontier.forEach(finding => {
    // Open non-opened parent.
    const parentId = this.backtracker(finding.id, finding.space)
    if (parentId && !this.spaces[parentId]) {
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
      if (childId && !this.spaces[childId]) {
        emits.push({
          id: childId,
          parentId: finding.id,
          depth: depth - finding.depth - 1,
          data: data
        })
      }
    }
  })

  // Cache bases before open.
  // Do this to provide bases for placeholder content.
  for (let i = 0; i < emits.length; i += 1) {
    const ev = emits[i]
    if (ev.parentId && this.mapper) {
      const parentSpace = this.spaces[ev.parentId]
      const basis = this.mapper(ev.parentId, parentSpace, ev.id)
      if (basis) {
        this.bases[ev.id] = basis
      }
    } else if (ev.childId && this.backmapper) {
      const childSpace = this.spaces[ev.childId]
      const basis = this.backmapper(ev.childId, childSpace, ev.id)
      if (basis) {
        this.bases[ev.id] = basis
      }
    }
  }

  // DEBUG
  // console.log('openable', emits.map(ev => ev.id))

  for (let i = 0; i < emits.length; i += 1) {
    const ev = emits[i]
    this.emit('open', ev)
  }
}
