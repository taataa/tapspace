module.exports = function (id, basis, callback) {
  // Initialize the fractal. Add and load the first fractal space.
  //
  // Parameters:
  //   id
  //     a string
  //   basis
  //     a Basis, the placement of the first item.
  //   callback
  //     a function (err, space)
  //

  if (!callback) {
    callback = () => {}
  }

  const placeholder = this.placeholder(id)
  this.viewport.addChild(placeholder)
  placeholder.setBasis(basis)

  this.fetcher(id, (err, data) => {
    if (err) {
      return callback(err)
    }

    const space = this.generator(id, data)
    this.spaces[id] = space
    this.viewport.addChild(space)
    space.setBasis(basis)

    this.viewport.removeChild(placeholder)

    return callback(null, space)
  })
}
