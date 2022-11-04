const ResizeAlign = require('../../../interaction/ResizeAlign')

module.exports = function (opts) {
  // tapspace.components.Viewport:responsive(opts)
  //
  // Make the viewport responsive to container size changes.
  // Keeps the viewport center at the same position relative to its size.
  //
  // Parameters
  //   opts
  //     optional boolean false to disable the ability.
  //     optional object with props:
  //       relativeCenter
  //         optional { rx, ry }, the relative point to keep fixed
  //         .. while resizing. Default { rx: 0.5, ry: 0.5 }
  //
  // Return
  //   this, for chaining
  //

  // False opts to unbind
  if (opts === false) {
    if (this.interactions.resize) {
      this.interactions.resize.unbind()
      delete this.interactions.resize
    }
    return
  }

  if (!opts) {
    opts = {}
  }

  // Find interactions
  let resize = this.interactions.resize

  if (resize) {
    resize.unbind()
  }

  // Not started. Begin interaction.
  resize = new ResizeAlign(this, opts)
  resize.bind()
  this.interactions.resize = resize

  return this
}
