const Plane = require('../../components/Plane')

module.exports = function (id, position, callback) {
  // Initialize the fracta. Add and load the first fractal space.
  //
  const placeholder = this.placeholder(id)

  const space = Plane.create()
  this.viewport.addChild(space)
  this.spaces[id] = space

  space.addChild(placeholder, position)

  this.fetcher(id, (err, data) => {
    if (err) {
      return callback(err)
    }

    const component = this.generator(id, data)

    space.addChild(component, position)
    space.removeChild(placeholder)

    if (callback) {
      return callback(null, component)
    }
  })
}
