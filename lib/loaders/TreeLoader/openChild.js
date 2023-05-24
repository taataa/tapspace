module.exports = function (childId, callback) {
  // Open a child space, given that the parent exists.
  //
  // Parameters:
  //   childId
  //     a string
  //   callback
  //     a function (err, child)
  //

  if (!callback) {
    callback = () => {}
  }

  if (this.spaces[childId]) {
    // Child already exists.
    setTimeout(() => {
      callback(null, this.spaces[childId], childId)
    }, 0)

    return
  }

  const parentId = this.backer(childId)

  const parentSpace = this.spaces[parentId]
  if (!parentSpace) {
    throw new Error('Parent does not exist: ' + parentId)
  }

  const childBasis = this.mapper(parentSpace, childId)

  if (!childBasis) {
    // Do not open, no track there
    setTimeout(() => {
      callback(null, null)
    }, 0)
  }

  const placeholder = this.placeholder(childId)
  placeholder.isPlaceholder = true
  this.spaces[childId] = placeholder
  this.viewport.addChild(placeholder)
  placeholder.setBasis(childBasis)

  this.fetcher(childId, (err, data) => {
    if (err) {
      return callback(err)
    }

    // Ensure that the parent still exists.
    // Maybe removed during fetch.
    if (!this.spaces[parentId]) {
      // Clean up
      delete this.spaces[childId]
      this.viewport.removeChild(placeholder)

      return callback(null, null)
    }

    const childSpace = this.generator(childId, data)
    this.spaces[childId] = childSpace
    this.viewport.addChild(childSpace)
    childSpace.setBasis(childBasis)

    this.viewport.removeChild(placeholder)

    return callback(null, childSpace, childId)
  })
}
