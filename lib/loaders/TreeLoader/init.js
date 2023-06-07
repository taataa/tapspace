module.exports = function (id, basis) {
  // @TreeLoader:init(id, basis)
  //
  // Initialize the tree. Add and load the first space.
  //
  // Parameters:
  //   id
  //     a string
  //   basis
  //     a Basis, the placement of the first item.
  //
  // Return
  //   this, for chaining
  //

  // Register basis
  this.bases[id] = basis
  // Register demand
  this.demand[id] = 1

  setTimeout(() => {
    this.loading[id] = true
    this.emit('open', id)
  }, 0)

  return this
}
