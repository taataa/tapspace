const Rotate = require('../../interaction/Rotate')

module.exports = function (options) {
  // tapspace.components.AbstractItem:rotatable(options)
  // tapspace.components.AbstractItem:rotateable
  //
  // A rotatable item can be turned around a center point.
  //
  // Parameters:
  //   options, various types:
  //     a boolean, set false to disable the ability to rotate.
  //     OR an optional object with properties:
  //       center
  //         a Point. Specifies a center point about which
  //         .. the item can be rotated.
  //         .. If the point is relative to
  //         .. the inner basis of the item, then the rotation center follows
  //         .. possible translations of the item.
  //
  // Return
  //   this, for chaining
  //

  // False to unbind
  if (options === false) {
    if (this.interactions.rotate) {
      this.interactions.rotate.unbind()
      delete this.interactions.rotate
    }
    return
  }

  // Replace old interaction
  if (this.interactions.rotate) {
    console.warn('The element already had an active rotate interaction.')
    this.interactions.rotate.unbind()
  }

  // Cancel contradicting interactions
  // if (this.interactions.drag) {
  //   this.interactions.drag.unbind()
  //   delete this.interactions.drag
  // }

  // Begin rotate interaction
  const rotate = new Rotate(this, this, options)
  this.interactions.rotate = rotate
  rotate.bind()

  return this
}
