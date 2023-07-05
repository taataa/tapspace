module.exports = function () {
  // @Viewport:findMostDistant()
  //
  // Find most distant frame or item.
  // The distance is computed from viewport anchor to the item anchor.
  //
  // Return
  //   a FrameComponent, or null if space is empty
  //

  // Only frames that have size ~ mass
  const nodes = this.hyperspace.getDescendants().filter(node => 'size' in node)

  // If space is empty
  if (nodes.length === 0) {
    return null
  }

  // Aggregate max distance and node
  const winner = nodes.reduce((acc, node) => {
    const dist = this.getVectorTo(node).getDistance().getRaw()
    if (dist > acc.max) {
      return { max: dist, node }
    }
    // else
    return acc
  }, { max: -Infinity, node: null })

  return winner.node
}
