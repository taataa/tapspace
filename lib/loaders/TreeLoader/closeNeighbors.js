const treeDistance = require('./utils/treeDistance')

module.exports = function (rootIds, maxDepth, data) {
  // @TreeLoader:closeNeighbors(rootIds, maxDepth[, data])
  //
  // Close those neighbors that are farther than the given depth
  // from one of the given IDs.
  //
  // Parameters:
  //   rootIds
  //     array of string, for example `['1234', '2345']`
  //   maxDepth
  //     a number, for example `4`.
  //     If zero or negative, all neighbors will be closed except the roots.
  //   data
  //     optional object to be passed to 'close' event.
  //

  if (!Array.isArray(rootIds)) {
    rootIds = [rootIds]
  }

  if (!data) {
    data = {}
  }

  // Use only those roots that exist
  const rids = rootIds.filter((id) => {
    if (this.spaces[id]) {
      return true
    }
    return false
  })

  if (rids.length < 1) {
    return
  }

  // Close only non-root spaces.
  const neighborIds = Object.keys(this.spaces).filter((id) => {
    return !rids.includes(id)
  })

  // Find depths
  const findings = neighborIds.map(nid => {
    const neighbor = this.spaces[nid]

    // Measure to closest root
    let minDepth = Infinity
    for (let i = 0; i < rids.length; i += 1) {
      const d = treeDistance(this.spaces, this.backtracker, rids[i], nid)
      if (d >= 0) {
        minDepth = Math.min(minDepth, d)
      }
    }

    return {
      id: nid,
      space: neighbor,
      depth: minDepth
    }
  })

  const emits = []
  const keeps = []

  findings.forEach(finding => {
    if (finding.depth > maxDepth) {
      // Finding is outside the depth threshold.
      const space = this.spaces[finding.id]
      if (space) {
        emits.push({
          id: finding.id,
          space: space,
          data: data
        })
      }
    } else {
      // Finding is inside the depth threshold, including depth === maxDepth.
      keeps.push(finding.id)
    }
  })

  // Clear loading states outside the neighborhood.
  // Purpose: this prevents addition of spaces outside the neighborhood.
  // Purpose: clear up loading states that never finished.
  // Detail: to allow loading to continue inside the neighborhood,
  //   only clear up those loading states that were not initiated by
  //   the spaces within the neighborhood.
  const loadingIds = Object.keys(this.loading)
  for (let i = 0; i < loadingIds.length; i += 1) {
    const loadingId = loadingIds[i]
    const initiatorId = this.loading[loadingId]
    if (!keeps.includes(initiatorId)) {
      delete this.loading[loadingId]
    }
  }

  // Enable host app to hook to removals
  for (let i = 0; i < emits.length; i += 1) {
    const ev = emits[i]
    this.emit('close', ev)
  }
}
