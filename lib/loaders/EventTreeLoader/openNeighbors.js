const findTreeDistances = require('./utils/findTreeDistances')
const findBacktier = require('./utils/findBacktier')
const findFrontier = require('./utils/findFrontier')

module.exports = function (id, maxDepth) {
  // @TreeLoader:openNeighbors(id, maxDepth)
  //
  // Open parents and children until max depth.
  //
  // Parameters:
  //   id
  //     a string, the first node ID.
  //   maxDepth
  //     a number, the maximum depth. For example `2`
  //

  // Stop recursion.
  if (maxDepth <= 0) {
    return
  }

  // Space may not exist, yet.
  const space = this.spaces[id]
  if (!space) {
    return
  }

  const findings = findTreeDistances(
    this.spaces,
    this.backtracker,
    [id]
  )

  // Update demands.
  findings.forEach((finding) => {
    const demand = Math.max(0, maxDepth - finding.depth + 1)
    if (this.demand[finding.id]) {
      // Maintain the largest demand while opening.
      this.demand[finding.id] = Math.max(demand, this.demand[finding.id])
    } else {
      if (demand > 0) {
        this.demand[finding.id] = demand
      }
    }
  })

  // Find neighbors that have unopened children or parents.
  const frontier = findFrontier(
    this.spaces,
    this.tracker,
    id,
    maxDepth - 1
  )
  const backtier = findBacktier(
    this.spaces,
    this.tracker,
    this.backtracker,
    id,
    maxDepth - 1
  )

  frontier.forEach((finding) => {
    if (this.demand[finding.id] > 1) {
      this.openChildren(finding.id)
    }
  })

  backtier.forEach((finding) => {
    if (this.demand[finding.id] > 1) {
      this.openParent(finding.id)
    }
  })
}
