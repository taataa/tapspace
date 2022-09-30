module.exports = function () {
  // tapspace.components.AbstractPlane:findMostDistant()
  //
  // Find most distant component i.e. an AbstractFrame.
  // The distance here is directed, and computed along positive z dimension.
  //
  // Return
  //   an AbstractFrame, or null if space is empty
  //

  // Only frames that have size ~ mass
  const nodes = this.space.getDescendants().filter(node => 'size' in node)

  // If space is empty
  if (nodes.length === 0) {
    return null
  }

  // Aggregate max distance and node
  const winner = nodes.reduce((acc, node) => {
    const delta = this.getVectorTo(node)
    if (delta.z > acc.max) {
      return {
        max: delta.z,
        node: node
      }
    }
    // else
    return acc
  }, { max: -Infinity, node: null })

  return winner.node
}
