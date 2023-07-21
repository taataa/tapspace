module.exports = function (id, basis, data) {
  // @TreeLoader:initSpace(id, basis[, data])
  //
  // Initialize the tree. Add and load the first space.
  //
  // Parameters:
  //   id
  //     a string
  //   basis
  //     a Basis, the placement of the first item.
  //   data
  //     optional object, to be passed to 'open' event.
  //
  // Emits:
  //   open
  //     with `{ id, first, data }` where `first` is a boolean.
  //

  // Default data
  if (!data) {
    data = {}
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

  // Register loading state.
  this.loading[id] = id

  setTimeout(() => {
    this.emit('open', {
      id,
      first: true,
      data
    })
  }, 0)
}
