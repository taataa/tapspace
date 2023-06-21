module.exports = function (childId) {
  // @TreeLoader:remapParent(childId)
  //
  // Update placement of parent with respect to the given children.
  // Transform the parent to match its new basis.
  // Internally, calls backmapper to find the new basis.
  // If the backmapper is not available, tries mapper.
  // Synchronous.
  //
  // Parameters:
  //   childId
  //     a string
  //

  // Space may be removed.
  const childSpace = this.spaces[childId]
  if (!childSpace) {
    return
  }

  // Find the parent
  const parentId = this.backtracker(childId, childSpace)
  const parentSpace = this.spaces[parentId]
  if (!parentSpace) {
    return
  }

  const newBasis = this.backmapper(childId, childSpace, parentId)
  if (newBasis) {
    parentSpace.setBasis(newBasis)
    return
  }

  const insertionBasis = this.mapper(parentId, parentSpace, childId)
  if (insertionBasis) {
    const childBasis = childSpace.getBasis()
    const newBasis = insertionBasis.getMatchedOuter(childBasis)
    parentSpace.setBasis(newBasis)
  }
}
