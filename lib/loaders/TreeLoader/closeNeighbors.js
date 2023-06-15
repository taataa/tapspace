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

  const neighborIds = Object.keys(this.spaces)

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

  findings.forEach(finding => {
    if (finding.depth > maxDepth) {
      // Finding is outside the max depth threshold.
      const space = this.spaces[finding.id]
      if (space) {
        emits.push({
          id: finding.id,
          space: space,
          data: data
        })
      }
    }
  })

  // Enable host app to hook to removals
  for (let i = 0; i < emits.length; i += 1) {
    const ev = emits[i]
    delete this.loading[ev.id]
    this.emit('close', ev)
  }
}
