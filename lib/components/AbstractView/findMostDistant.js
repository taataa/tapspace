module.exports = function () {
  // tapspace.components.AbstractView:findMostDistant()
  //
  // Find most distant frame or item.
  // The distance here is directed, and computed along positive z dimension.
  //
  // Return
  //   a Frame, or null if space is empty
  //

  // Only frames that have size ~ mass
  const nodes = this.space.getDescendants().filter(node => 'size' in node)

  // If space is empty
  if (nodes.length === 0) {
    return null
  }

  // Aggregate max distance and node
  const winner = nodes.reduce((acc, node) => {
    const deltaz = this.getVectorTo(node).vec.z
    if (deltaz > acc.max) {
      return {
        max: deltaz,
        node: node
      }
    }
    // else
    return acc
  }, { max: -Infinity, node: null })

  return winner.node
}
