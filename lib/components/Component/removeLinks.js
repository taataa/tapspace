module.exports = function () {
  // @Component:removeLinks()
  //
  // Remove all links.
  //
  // Return
  //   this, for chaining
  //

  // Remove all instances from adjacent.
  Object.keys(this.links).forEach(key => {
    const neighbor = this.links[key]

    Object.keys(neighbor.links).forEach(keyy => {
      neighbor.removeLink(keyy, this)
    })

    delete this.links[key]
  })

  this.links = {}

  return this
}
