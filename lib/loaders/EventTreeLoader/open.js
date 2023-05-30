module.exports = function (id, content) {
  // @TreeLoader:open(id, content)
  //
  // Open a child space, given that it was expected.
  //
  // Parameters:
  //   id
  //     a string
  //   content
  //     a Component
  //
  // Return
  //   this, for chaining
  //

  if (!this.bases[id]) {
    return this
  }

  // TODO auto convert text content to Item

  this.spaces[id] = content
  this.viewport.addChild(content)
  placeholder.setBasis(this.bases[id])

  return this
}
