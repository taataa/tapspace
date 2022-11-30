const RealignView = require('../../interaction/RealignView')

module.exports = function (opts) {
  // @Viewport:responsive(opts)
  //
  // Make the viewport responsive to container size changes.
  // Keeps the viewport center at the same position relative to its size.
  //
  // Parameters
  //   opts
  //     optional boolean false to disable the ability.
  //     optional object with props:
  //       relativeAnchor
  //         optional { rx, ry }, the relative point to keep fixed
  //         .. while resizing. Default { rx: 0.5, ry: 0.5 }
  //
  // Return
  //   this, for chaining
  //

  // False opts to unbind
  if (opts === false) {
    this.removeInteraction('resize')
    return
  }

  if (!opts) {
    opts = {}
  }

  // Find interactions
  let resize = this.getInteraction('resize')

  if (resize) {
    resize.unbind()
  }

  // Not started. Begin interaction.
  resize = new RealignView(this, opts)
  this.addInteraction('resize', resize)

  return this
}
