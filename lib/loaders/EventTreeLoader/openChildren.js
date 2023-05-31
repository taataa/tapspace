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

  const childIds = this.tracker(id, parentSpace)

  for (let i = 0; i < childIds.length; i += 1) {
    const cid = childIds[i]
    this.openChild(id, cid)
  }
}
