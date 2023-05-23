module.exports = function (childId, callback) {
  // Open a parent space relative to the given child.
  //
  // Parameters:
  //   childId
  //     a string
  //   callback
  //     a function (err, parent)
  //

  const parentId = this.backer(childId)

  if (!parentId) {
    // Has no parent. Is root.
    setTimeout(() => {
      return callback(null, null)
    }, 0)

    return
  }

  const parentSpace = this.spaces[parentId]
  if (parentSpace) {
    // Parent already exists.
    setTimeout(() => {
      return callback(null, parentSpace)
    }, 0)

    return
  }

  const childSpace = this.spaces[childId]
  if (!childSpace) {
    throw new Error('Child does not exist: ' + childId)
  }

  const childPosition = childSpace.atAnchor()

  const placeholder = this.placeholder(parentId)
  this.viewport.addChild(placeholder, childPosition)

  this.fetcher(parentId, (err, data) => {
    if (err) {
      return callback(err)
    }

    const parentSpace = this.generator(parentId, data)
    this.spaces[parentId] = parentSpace
    this.viewport.addChild(parentSpace)

    const insertionPoint = this.tracker(parentSpace, childId)
    parentSpace.matchPoint(insertionPoint, childPosition)

    this.viewport.removeChild(placeholder)

    if (callback) {
      return callback(null, parentSpace)
    }
  })
}
