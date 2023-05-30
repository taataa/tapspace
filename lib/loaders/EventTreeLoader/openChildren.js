module.exports = function (id, callback) {
  // @TreeLoader:openChildren(id, callback)
  //
  // Open all child spaces for the given parent id.
  //
  // Parameters:
  //   id
  //     a string
  //   callback
  //     a function (err, childIds, childSpaces)
  //

  // Space may be removed.
  const parentSpace = this.spaces[id]
  if (!parentSpace) {
    setTimeout(() => {
      callback(null, [])
    }, 0)

    return
  }

  const childIds = this.tracker(id, parentSpace)

  const expectedNumCallbacks = childIds.length
  let numCallbacks = 0
  let errored = false
  const openedChildIds = []
  const openedChildSpaces = []

  const requestCallback = (err, childId, childSpace) => {
    // Prevent multiple callbacks
    if (errored || numCallbacks >= expectedNumCallbacks) {
      return
    }

    if (err) {
      errored = true
      return callback(err)
    }

    numCallbacks += 1
    openedChildIds.push(childId)
    openedChildSpaces.push(childSpace)

    if (numCallbacks === expectedNumCallbacks) {
      callback(null, openedChildIds, openedChildSpaces)
    }
  }

  for (let i = 0; i < childIds.length; i += 1) {
    const cid = childIds[i]
    this.openChild(id, cid, requestCallback)
  }
}
