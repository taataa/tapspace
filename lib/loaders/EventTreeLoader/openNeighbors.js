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

  // Update demand for this node
  let localDemand = maxDepth + 1
  if (this.demand[id]) {
    localDemand = Math.max(localDemand, this.demand[id])
  }
  this.demand[id] = localDemand

  const findings = findTreeDistances(
    this.spaces,
    this.backtracker,
    [id]
  )

  // Update demands.
  findings.forEach((finding) => {
    const currentDemand = this.demand[finding.id]
    const proposedDemand = Math.max(0, localDemand - finding.depth)
    if (currentDemand) {
      // Maintain the largest demand while opening.
      this.demand[finding.id] = Math.max(proposedDemand, currentDemand)
    } else {
      // No demand yet set.
      if (proposedDemand > 0) {
        this.demand[finding.id] = proposedDemand
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
    const findingDemand = this.demand[finding.id]
    // Avoid propagation toward higher demand.
    if (findingDemand > 1 && findingDemand < localDemand) {
      this.openChildren(finding.id)
    } else if (finding.id === id) {
      this.openChildren(id)
    }
  })

  backtier.forEach((finding) => {
    const findingDemand = this.demand[finding.id]
    // Avoid propagation toward higher demand.
    if (findingDemand > 1 && findingDemand < localDemand) {
      this.openParent(finding.id)
    } else if (finding.id === id) {
      this.openParent(id)
    }
  })
}
