module.exports = function (id, data) {
  // @TreeLoader:openChildren(id[, data])
  //
  // Open all child spaces for the given parent id.
  //
  // Parameters:
  //   id
  //     a string, the parent space ID.
  //   data
  //     optional object, the context data passed to 'open' event.
  //

  // Parent may be removed.
  const parentSpace = this.spaces[id]
  if (!parentSpace) {
    return
  }

  // Parent may have low demand.
  if (this.demand[id] <= 1) {
    return
  }

  if (!data) {
    data = {}
  }

  const childIds = this.tracker(id, parentSpace)

  for (let i = 0; i < childIds.length; i += 1) {
    const cid = childIds[i]
    this.openChild(id, cid, data)
  }
}
