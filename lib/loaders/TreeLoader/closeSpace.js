module.exports = function (id, data) {
  // @TreeLoader:closeSpace(id[, data])
  //
  // Close the space and all its children and successors.
  // In other words, close the subtree where the space is the root.
  // Makes the loader emit 'close'.
  // The event should be handled by calling loader.removeSpace()
  //
  // Parameters:
  //   id
  //     a string, the space ID.
  //   data
  //     optional object, the context data passed to 'close' event.
  //

  // The space may be loading. Ensure not.
  delete this.loading[id]

  // The space may not exist anymore.
  const space = this.spaces[id]
  if (!space) {
    return
  }

  // Default data
  if (!data) {
    data = {}
  }

  // Close its children. Note recursion.
  this.closeChildren(id)

  this.emit('close', { id, space, data })
}
