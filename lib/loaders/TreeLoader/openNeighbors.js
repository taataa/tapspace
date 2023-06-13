const findBacktier = require('./utils/findBacktier')
const findFrontier = require('./utils/findFrontier')

module.exports = function (id, maxDepth, data) {
  // @TreeLoader:openNeighbors(id, maxDepth[, data])
  //
  // Open parents and children until max depth.
  //
  // Parameters:
  //   id
  //     a string, the first node ID.
  //   maxDepth
  //     a number, the maximum depth. For example `2`
  //   data
  //     optional object, the context data passed to 'open' event.
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

  // Default context
  if (!data) {
    data = {}
    // TODO possible preset data
    // rootSpaceId: id
  }

  // Update demand for this node
  let localDemand = maxDepth + 1
  if (this.demand[id]) {
    localDemand = Math.max(localDemand, this.demand[id])
  }
  this.demand[id] = localDemand

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
    // Increase neighborhood demand.
    const currentDemand = this.demand[finding.id] || 0
    const minDemand = localDemand - finding.depth
    this.demand[finding.id] = Math.max(minDemand, currentDemand)
    // Open children
    this.openChildren(finding.id, data)
  })

  backtier.forEach((finding) => {
    // Increase neighborhood demand.
    const currentDemand = this.demand[finding.id] || 0
    const minDemand = localDemand - finding.depth
    this.demand[finding.id] = Math.max(minDemand, currentDemand)
    // Open parent
    this.openParent(finding.id, data)
  })
}
