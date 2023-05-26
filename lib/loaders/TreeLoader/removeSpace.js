module.exports = function (spaceId) {
  // @TreeLoader:removeSpace(spaceId)
  //
  // Remove the space, given that the space exists.
  // Does not remove the children.
  //
  // Parameters:
  //   parentId
  //     a string
  //

  const placeholder = this.placeholders[spaceId]
  if (placeholder) {
    delete this.placeholders[spaceId]
    placeholder.remove()
  }

  const space = this.spaces[spaceId]
  if (space) {
    delete this.spaces[spaceId]
    space.remove()
  }
}
