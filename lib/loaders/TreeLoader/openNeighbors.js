module.exports = function (id, depth, callback) {
  if (!callback) {
    callback = () => {}
  }

  if (depth <= 0) {
    setTimeout(() => {
      callback(null)
    }, 0)

    return
  }

  const space = this.spaces[id]
  if (!space) {
    throw new Error('Space does not exist: ' + id)
  }

  let called = false
  const tryCallback = (err) => {
    if (!called) {
      called = true
      callback(err)
    }
  }

  this.openParent(id, (err, parent, parentId) => {
    if (err) {
      return tryCallback(err)
    }
    if (!parent) {
      return
    }
    if (depth > 1) {
      // Recursion
      return this.openNeighbors(parentId, depth - 1)
    }
  })

  const childrenIds = this.tracker(space)
  childrenIds.forEach(cid => {
    this.openChild(cid, (err, child) => {
      if (err) {
        return tryCallback(err)
      }
      if (!child) {
        return
      }
      if (depth > 1) {
        // Recursion
        return this.openNeighbors(cid, depth - 1)
      }
    })
  })
}
