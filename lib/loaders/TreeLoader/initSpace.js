module.exports = function (id, basis, depth, data) {
  // @TreeLoader:initSpace(id, basis, depth[, data])
  //
  // Initialize the tree. Add and load the first space and
  // continue loading neighboring spaces to the given depth.
  //
  // Parameters:
  //   id
  //     a string
  //   basis
  //     a Basis, the placement of the first item.
  //   depth
  //     an integer, opening depth. The depth of 0 loads only the space
  //     .. with the given id and none of the adjacent spaces.
  //   data
  //     optional object, to be passed to 'open' event.
  //
  // Emits:
  //   open
  //     with `{ id, depth, first, data }` where
  //       first
  //         a boolean, true if the space was empty.
  //       depth
  //         an integer, the remaining
  //

  // Default data
  if (!data) {
    data = {}
  }

  // Limit depth
  if (typeof depth !== 'number' || depth < 0) {
    depth = 0
  }

  // Prevent duplicate spaces
  if (this.spaces[id]) {
    console.warn('Unnecessary initSpace call: already loaded ' + id)
    return
  }

  // Register basis
  this.bases[id] = basis

  // Prevent duplicate loading.
  if (this.loading[id]) {
    console.warn('Unnecessary initSpace call: already loading ' + id)
    return
  }

  const first = Object.keys(this.spaces).length === 0 &&
    Object.keys(this.loading).length === 0

  // Register loading state.
  this.loading[id] = id

  setTimeout(() => {
    this.emit('open', { id, depth, first, data })
  }, 0)
}
