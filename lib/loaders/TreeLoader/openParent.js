module.exports = function (childId, callback) {
  // Open a parent space relative to the given child.
  //
  // Parameters:
  //   childId
  //     a string
  //   callback
  //     a function (err, parentId, parent)
  //

  const parentId = this.backer(childId)

  // Root has no parent.
  if (!parentId) {
    setTimeout(() => {
      callback(null, null, null)
    }, 0)

    return
  }

  if (callback) {
    this.registerCallback(parentId, callback)
  }

  // Parent may exist already.
  const parentSpace = this.spaces[parentId]
  if (parentSpace) {
    return this.resolveCallbacks(parentId)
  }

  // Child may not exist anymore.
  const childSpace = this.spaces[childId]
  if (!childSpace) {
    return this.resolveCallbacks(parentId)
  }

  // Placeholder for parent may exist already.
  if (this.placeholders[parentId]) {
    // Rely that the callback will be resolved when the parent is finished.
    return
  }

  const childBasis = childSpace.getBasis()

  const placeholder = this.placeholder(parentId)
  this.placeholders[parentId] = placeholder
  this.viewport.addChild(placeholder)
  placeholder.setBasis(childBasis)

  this.fetcher(parentId, (err, data) => {
    // In any case, clean up placeholder
    const postPlaceholder = this.placeholders[parentId]
    if (postPlaceholder) {
      delete this.placeholders[parentId]
      postPlaceholder.remove()
    }

    if (err) {
      return this.resolveCallbacks(parentId, err)
    }

    // Child may not exist anymore.
    const postChildSpace = this.spaces[childId]
    if (!postChildSpace) {
      return this.resolveCallbacks(parentId)
    }

    // Child may have been replaced. Find the basis again.
    const postChildBasis = postChildSpace.getBasis()

    const parentSpace = this.generator(parentId, data)
    const insertionBasis = this.mapper(parentSpace, childId)
    if (!insertionBasis) {
      // No basis for the child in the map, currently.
      return this.resolveCallbacks(parentId)
    }

    this.spaces[parentId] = parentSpace
    this.viewport.addChild(parentSpace)
    parentSpace.matchBasis(insertionBasis, postChildBasis)

    return this.resolveCallbacks(parentId)
  })
}
