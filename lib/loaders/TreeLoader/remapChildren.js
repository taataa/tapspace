module.exports = function (parentId) {
  // @TreeLoader:remapChildren(parentId)
  //
  // Update placements of children of the given parent.
  // Transform the children to match their new bases.
  // Internally, calls mapper to find the new bases.
  // Synchronous.
  //
  // Parameters:
  //   parentId
  //     a string
  //

  // Space may be removed.
  const parentSpace = this.spaces[parentId]
  if (!parentSpace) {
    return
  }

  // Find children
  const childIds = this.tracker(parentId, parentSpace)

  childIds.forEach(childId => {
    // Update only existing children.
    const childSpace = this.spaces[childId]
    if (!childSpace) {
      return
    }

    // Find the new basis for the child.
    const newChildBasis = this.mapper(parentId, parentSpace, childId)
    childSpace.setBasis(newChildBasis)
  })
}
