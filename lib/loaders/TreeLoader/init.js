module.exports = function (id, basis, data) {
  // @TreeLoader:init(id, basis[, data])
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
  // Return
  //   this, for chaining
  //
  // Emits:
  //   open
  //     with `{ id, first, data }` where `first` is a boolean.
  //

  // Default data
  if (!data) {
    data = {}
  }

  // Register basis
  this.bases[id] = basis

  // Register loading state.
  this.loading[id] = id

  setTimeout(() => {
    this.emit('open', {
      id,
      first: true,
      data
    })
  }, 0)

  return this
}
