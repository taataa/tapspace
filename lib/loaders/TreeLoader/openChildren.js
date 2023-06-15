module.exports = function (parentId, data) {
  // @TreeLoader:openChildren(parentId[, data])
  //
  // Open all child spaces for the given parent id.
  //
  // Parameters:
  //   parentId
  //     a string, the parent space ID.
  //   data
  //     optional object, the context data passed to 'open' event.
  //

  // Parent may be removed.
  const parentSpace = this.spaces[parentId]
  if (!parentSpace) {
    return
  }

  if (!data) {
    data = {}
  }

  const childIds = this.tracker(parentId, parentSpace)

  for (let i = 0; i < childIds.length; i += 1) {
    const cid = childIds[i]
    this.openChild(parentId, cid, data)
  }
}
