module.exports = function (id, position, callback) {
  // Initialize the fractal. Add and load the first fractal space.
  //
  // Parameters:
  //   id
  //     a string
  //   position
  //     a Point
  //   callback
  //     a function (err, space)
  //

  const placeholder = this.placeholder(id)
  this.viewport.addChild(placeholder, position)

  this.fetcher(id, (err, data) => {
    if (err) {
      return callback(err)
    }

    const space = this.generator(id, data)
    this.spaces[id] = space
    this.viewport.addChild(space, position)

    this.viewport.removeChild(placeholder)

    if (callback) {
      return callback(null, space)
    }
  })
}
