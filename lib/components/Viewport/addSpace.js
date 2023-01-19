const Space = require('../Space')

module.exports = function (spaceOrPosition, optPosition) {
  // @Viewport:addSpace(position)
  //
  // Create a Space and add it under Viewport for display.
  // The Space will be appear in the viewport hyperspace at the given
  // position.
  //
  // Example:
  // ```
  // const nodespace = view.addSpace(view.atCenter())
  // nodespace.addChild(tapspace.createItem('Hello'))
  // ```
  //
  // Parameters:
  //   position
  //     optional Point
  //
  // Alternative parameters:
  //   space
  //     a Space
  //   position
  //     optional Point
  //
  // Return
  //   a Space, the created space.
  //
  let space
  let position
  if (spaceOrPosition && spaceOrPosition.isSpace) {
    space = spaceOrPosition
    if (optPosition) {
      position = optPosition
    } else {
      position = this.atAnchor()
    }
  } else {
    space = new Space()
    if (spaceOrPosition) {
      position = spaceOrPosition
    } else {
      position = this.atAnchor()
    }
  }

  this.addChild(space, position)

  return space
}
