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

  // Default data
  if (!data) {
    data = {}
  }

  // Register basis
  this.bases[id] = basis

  setTimeout(() => {
    this.loading[id] = true
    this.emit('open', { id, data })
  }, 0)

  return this
}
