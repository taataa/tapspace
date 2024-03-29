module.exports = function (id, depth, data) {
  // @TreeLoader:openNeighbors(id, depth[, data])
  //
  // Open parents and children until max depth.
  // The recursive opening until the max depth requires that your
  // event handler implementation for the 'open' event does
  // call TreeLoader:openNeighbors method again and passes the depth property
  // the loader attached to the 'open' event.
  // However, you are free to stop or limit recursion by not calling
  // the method or decreasing the depth.
  //
  // Parameters:
  //   id
  //     a string, the first node ID.
  //   depth
  //     a number, the desired opening depth. For example `2` opens
  //     .. parents and children and their parents and children.
  //   data
  //     optional object, the context data passed to 'open' event.
  //
  // Emits:
  //   open
  //     with `{ id, depth, childId?, parentId?, data }` where
  //       id
  //         a string, the space ID
  //       depth
  //         an integer indicating how many levels should be opened
  //         .. after this one. Pass this one to TreeLoader:openNeighbors.
  //       childId
  //         optional string, available in the 'open' events of parent spaces
  //         .. if any.
  //       parentId
  //         optional string, available in the 'open' events of a child spaces
  //         .. if any.
  //       data
  //         an object, optional context data.
  //     Loader emits this event for each child and the parent space.
  //

  // DEBUG
  // console.log('openNeighbors at', id, 'to depth', depth)

  // Stop recursion. Handles also undefined like default zero.
  // Detect nullish values to prevent infinite recursion by NaN.
  if (!depth || depth <= 0) {
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
    if (parentId && !this.spaces[parentId] && !this.loading[parentId]) {
      emits.push({
        id: parentId,
        childId: finding.id,
        depth: depth - finding.depth - 1,
        data
      })
    }
    // Open non-opened children.
    const childIds = this.tracker(finding.id, finding.space)
    for (let i = 0; i < childIds.length; i += 1) {
      const childId = childIds[i]
      if (childId && !this.spaces[childId] && !this.loading[childId]) {
        emits.push({
          id: childId,
          parentId: finding.id,
          depth: depth - finding.depth - 1,
          data
        })
      }
    }
  })

  // Frontier shape can be almost anything and therefore
  // it is likely that some spaces are both parents and children.
  // We must avoid duplicates.
  const uniqueEmits = Object.values(emits.reduce((index, ev) => {
    const preEv = index[ev.id]
    if (preEv) {
      // Exists already. Merge.
      const mergedEv = {
        id: ev.id,
        depth: Math.min(preEv.depth, ev.depth),
        data: ev.data
      }
      if (preEv.parentId || ev.parentId) {
        mergedEv.parentId = preEv.parentId || ev.parentId
      }
      if (preEv.childId || ev.childId) {
        mergedEv.childId = preEv.childId || ev.childId
      }
      index[ev.id] = mergedEv
    } else {
      index[ev.id] = ev
    }
    return index
  }, {}))

  // DEBUG
  // if (emits.length > uniqueEmits.length) {
  //   const n = emits.length - uniqueEmits.length
  //   console.log('! Non-unique emits found: ', n)
  // }

  // Cache bases before open.
  // Do this to provide bases for placeholder content.
  for (let i = 0; i < uniqueEmits.length; i += 1) {
    const ev = uniqueEmits[i]
    if (ev.parentId) {
      const parentSpace = this.spaces[ev.parentId]
      const basis = this.mapper(ev.parentId, parentSpace, ev.id)
      if (basis) {
        this.bases[ev.id] = basis
      }
    } else if (ev.childId) {
      const childSpace = this.spaces[ev.childId]
      const basis = this.backmapper(ev.childId, childSpace, ev.id)
      if (basis) {
        this.bases[ev.id] = basis
      }
    }
  }

  // DEBUG
  // console.log('openable', uniqueEmits.map(ev => ev.id))

  // Register loading state.
  for (let i = 0; i < uniqueEmits.length; i += 1) {
    const ev = uniqueEmits[i]
    const neighborId = ev.parentId || ev.childId
    if (!neighborId) {
      throw new Error('Invalid neighborId for: ' + ev.id)
    }
    this.loading[ev.id] = neighborId
  }

  for (let i = 0; i < uniqueEmits.length; i += 1) {
    const ev = uniqueEmits[i]
    this.emit('open', ev)
  }
}
