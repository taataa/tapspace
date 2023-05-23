module.exports = function (parentId, childId, callback) {
  // Open a child space relative to the given parent.
  //
  // Parameters:
  //   parentId
  //     a string
  //   childId
  //     a string
  //   callback
  //     a function (err, child)
  //

  if (!callback) {
    callback = () => {}
  }

  const parentSpace = this.spaces[parentId]
  if (!parentSpace) {
    throw new Error('Parent does not exist: ' + parentId)
  }

  if (this.spaces[childId]) {
    // Child already exists.
    setTimeout(() => {
      callback(null, this.spaces[childId])
    }, 0)

    return
  }

  const childBasis = this.tracker(parentSpace, childId)

  const placeholder = this.placeholder(childId)
  this.viewport.addChild(placeholder)
  placeholder.setBasis(childBasis)

  this.fetcher(childId, (err, data) => {
    if (err) {
      return callback(err)
    }

    const childSpace = this.generator(childId, data)
    this.spaces[childId] = childSpace
    this.viewport.addChild(childSpace)
    childSpace.setBasis(childBasis)

    this.viewport.removeChild(placeholder)

    if (callback) {
      return callback(null, childSpace)
    }
  })
}
