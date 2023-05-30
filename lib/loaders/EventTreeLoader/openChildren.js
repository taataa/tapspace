module.exports = function (id) {
  // @TreeLoader:openChildren(id)
  //
  // Open all child spaces for the given parent id.
  //
  // Parameters:
  //   id
  //     a string
  //

  // Space may be removed.
  const parentSpace = this.spaces[id]
  if (!parentSpace) {
    return
  }

  // Ensure enough demand.
  const parentDemand = this.demand[id]
  if (parentDemand < 2) {
    // Not enough demand to open children.
    console.log('Not enough demand to open children')
    return
  }

  const childIds = this.tracker(id, parentSpace)

  for (let i = 0; i < childIds.length; i += 1) {
    const cid = childIds[i]
    this.openChild(id, cid)
  }
}
