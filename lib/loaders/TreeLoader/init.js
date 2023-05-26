module.exports = function (id, basis, callback) {
  // @TreeLoader:init(id, basis, callback)
  //
  // Initialize the tree. Add and load the first space.
  //
  // Parameters:
  //   id
  //     a string
  //   basis
  //     a Basis, the placement of the first item.
  //   callback
  //     a function (err, spaceId, space)
  //

  if (callback) {
    this.registerCallback(id, callback)
  }

  const placeholder = this.placeholder(id)
  this.placeholders[id] = placeholder
  this.viewport.addChild(placeholder)
  placeholder.setBasis(basis)

  this.fetcher(id, (err, data) => {
    if (err) {
      return this.resolveCallbacks(id, err)
    }

    const postSpace = this.spaces[id]
    if (!postSpace) {
      const space = this.generator(id, data)
      this.spaces[id] = space
      this.viewport.addChild(space)
      space.setBasis(basis)
    }

    const postPlaceholder = this.placeholders[id]
    if (postPlaceholder) {
      delete this.placeholders[id]
      postPlaceholder.remove()
    }

    return this.resolveCallbacks(id)
  })
}
