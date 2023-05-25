module.exports = function (childId, callback) {
  // @TreeLoader:openChild(childId, callback)
  //
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
      if (this.spaces[childId]) {
        // Child still exists
        callback(null, this.spaces[childId], childId)
      }
    }, 0)

    return
  }

  if (this.placeholders[childId]) {
    // Child is already loading.

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
      placeholder.remove()

      return callback(null, null)
    }

    // It is possible that the parent has changed.
    const postParentSpace = this.spaces[parentId]
    // It is possible that the parent is reloaded and a placeholder.
    if (postParentSpace.isPlaceholder) {
      return callback(null, null)
    }
    // Find the basis again.
    const postChildBasis = this.mapper(postParentSpace, childId)

    const childSpace = this.generator(childId, data)
    this.spaces[childId] = childSpace
    this.viewport.addChild(childSpace)
    childSpace.setBasis(postChildBasis)

    placeholder.remove()

    return callback(null, childSpace, childId)
  })
}
