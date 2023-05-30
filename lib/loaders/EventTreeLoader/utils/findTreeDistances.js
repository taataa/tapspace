const treeDistance = require('./treeDistance')

module.exports = (spaces, backtracker, rids) => {
  // Find tree-distances from the closest root space to the space
  // for each space.
  //
  // Parameters:
  //   spaces
  //     a object
  //   backtracker
  //     a function
  //   rids
  //     array of ID, the root space IDs for the search.
  //
  const neighborIds = Object.keys(spaces)

  // Find depths
  const findings = neighborIds.map(nid => {
    const neighbor = spaces[nid]

    // Measure to closest
    let minDepth = Infinity
    for (let i = 0; i < rids.length; i += 1) {
      const d = treeDistance(spaces, backtracker, rids[i], nid)
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

  return findings
}
