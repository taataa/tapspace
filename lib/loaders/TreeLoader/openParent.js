module.exports = function (childId, callback) {
  // @TreeLoader:openParent(childId, callback)
  //
  // Open a parent space relative to the given child.
  //
  // Parameters:
  //   childId
  //     a string
  //   callback
  //     a function (err, parentId, parent)
  //

  // Child may not exist anymore.
  const childSpace = this.spaces[childId]
  if (!childSpace) {
    setTimeout(() => {
      callback(null, null, null)
    }, 0)

    return
  }

  const parentId = this.backtracker(childId, childSpace)

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

  // Placeholder for parent may exist already.
  if (this.placeholders[parentId]) {
    // Rely that the callback will be resolved when the parent is finished.
    return
  }

  // Parent may exist already.
  const parentSpace = this.spaces[parentId]
  if (parentSpace) {
    return this.resolveCallbacks(parentId)
  }

  // Construct
  const placeholder = this.placeholder(parentId)
  this.placeholders[parentId] = placeholder
  this.viewport.addChild(placeholder)
  // Place
  const childBasis = childSpace.getBasis()
  placeholder.setBasis(childBasis)

  this.fetcher(parentId, (err) => {
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

    // Construct
    const parentSpace = this.generator(parentId)
    // Find position
    const insertionBasis = this.mapper(parentId, parentSpace, childId)
    if (!insertionBasis) {
      // No basis for the child in the map, currently.
      return this.resolveCallbacks(parentId)
    }
    // Place
    this.spaces[parentId] = parentSpace
    this.viewport.addChild(parentSpace)
    parentSpace.matchBasis(insertionBasis, postChildBasis)

    return this.resolveCallbacks(parentId)
  })
}
