const treeDistance = require('./utils/treeDistance')

module.exports = function (rootIds, maxDepth) {
  // @TreeLoader:closeNeighbors(rootIds, maxDepth)
  //
  // Close those neighbors that are farther than the given depth
  // from one of the given IDs.
  //
  // Parameters:
  //   rootIds
  //     array of string, for example `['1234', '2345']`
  //   maxDepth
  //     a number, for example `4`.
  //

  if (!Array.isArray(rootIds)) {
    rootIds = [rootIds]
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

    // Measure to closest
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

  findings.forEach(finding => {
    if (finding.depth > maxDepth) {
      const space = this.spaces[finding.id]
      if (space) {
        delete this.spaces[finding.id]
        space.remove()
      }
    }
  })
}
