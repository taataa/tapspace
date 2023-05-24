module.exports = function (childId, callback) {
  // Open a parent space relative to the given child.
  //
  // Parameters:
  //   childId
  //     a string
  //   callback
  //     a function (err, parent)
  //

  if (!callback) {
    callback = () => {}
  }

  const parentId = this.backer(childId)

  if (!parentId) {
    // Has no parent. Is root.
    setTimeout(() => {
      callback(null, null)
    }, 0)

    return
  }

  const parentSpace = this.spaces[parentId]
  if (parentSpace) {
    // Parent already exists.
    setTimeout(() => {
      callback(null, parentSpace, parentId)
    }, 0)

    return
  }

  const childSpace = this.spaces[childId]
  if (!childSpace) {
    throw new Error('Child does not exist: ' + childId)
  }

  const childBasis = childSpace.getBasis()

  const placeholder = this.placeholder(parentId)
  placeholder.isPlaceholder = true
  this.spaces[parentId] = placeholder
  this.viewport.addChild(placeholder)
  placeholder.setBasis(childBasis)

  this.fetcher(parentId, (err, data) => {
    if (err) {
      return callback(err)
    }

    // Ensure that the child still exists.
    // Maybe removed during fetch.
    if (!this.spaces[childId]) {
      // Clean up
      delete this.spaces[parentId]
      this.viewport.removeChild(placeholder)

      return callback(null, null)
    }

    const parentSpace = this.generator(parentId, data)
    this.spaces[parentId] = parentSpace
    this.viewport.addChild(parentSpace)

    const insertionBasis = this.mapper(parentSpace, childId)
    parentSpace.matchBasis(insertionBasis, childBasis)

    this.viewport.removeChild(placeholder)

    return callback(null, parentSpace, parentId)
  })
}
