module.exports = function (id) {
  // @TreeLoader:openChildren(id)
  //
  // Open all child spaces for the given parent id.
  //
  // Parameters:
  //   id
  //     a string, the parent space ID.
  //

  // Space may be removed.
  const parentSpace = this.spaces[id]
  if (!parentSpace) {
    return
  }

  // Space may have low demand.
  if (this.demand[id] <= 1) {
    return
  }

  const childIds = this.tracker(id, parentSpace)

  for (let i = 0; i < childIds.length; i += 1) {
    const cid = childIds[i]
    this.openChild(id, cid)
  }
}
