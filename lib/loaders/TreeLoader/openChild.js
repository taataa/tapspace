module.exports = function (parentId, childId, callback) {
  // @TreeLoader:openChild(parentId, childId, callback)
  //
  // Open a child space, given that the parent exists.
  //
  // Parameters:
  //   parentId
  //     a string
  //   childId
  //     a string
  //   callback
  //     a function (err, childId, child)
  //

  if (callback) {
    this.registerCallback(childId, callback)
  }

  // Child may already exist.
  const childSpace = this.spaces[childId]
  if (childSpace) {
    return this.resolveCallbacks(childId)
  }

  // Placeholder may already exist.
  if (this.placeholders[childId]) {
    // Rely that the callback will be resolved when the child is finished.
    return
  }

  // Parent may be is already removed.
  const parentSpace = this.spaces[parentId]
  if (!parentSpace) {
    return this.resolveCallbacks(childId)
  }

  // Find location for the placeholder.
  const childBasis = this.mapper(parentId, parentSpace, childId)
  if (!childBasis) {
    // Do not open, no map for the child.
    return this.resolveCallbacks(childId)
  }

  const placeholder = this.placeholder(childId)
  this.placeholders[childId] = placeholder
  this.viewport.addChild(placeholder)
  placeholder.setBasis(childBasis)

  this.fetcher(childId, (err) => {
    // In any case, clean up placeholder
    const postPlaceholder = this.placeholders[childId]
    if (postPlaceholder) {
      delete this.placeholders[childId]
      postPlaceholder.remove()
    }

    if (err) {
      return this.resolveCallbacks(childId, err)
    }

    // Parent may have vanished.
    const postParentSpace = this.spaces[parentId]
    if (!postParentSpace) {
      return this.resolveCallbacks(childId)
    }

    // Find the basis again.
    const postChildBasis = this.mapper(parentId, postParentSpace, childId)
    if (!postChildBasis) {
      // No basis for the child in the map, currently.
      return this.resolveCallbacks(childId)
    }

    const childSpace = this.generator(childId)
    this.spaces[childId] = childSpace
    this.viewport.addChild(childSpace)
    childSpace.setBasis(postChildBasis)

    return this.resolveCallbacks(childId)
  })
}
