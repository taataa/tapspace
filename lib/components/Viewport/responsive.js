const RealignView = require('../../interaction/RealignView')

module.exports = function (enable) {
  // @Viewport:responsive([enable])
  //
  // Make the viewport responsive to container size changes.
  // Keeps the viewport anchor at the same position relative to its size.
  //
  // Parameters
  //   enable
  //     optional boolean, default is true. Set false to disable the ability.
  //
  // Return
  //   this, for chaining
  //

  // False opts to unbind
  if (enable === false) {
    this.removeInteraction('resize')
    return
  }

  // Find interactions
  let resize = this.getInteraction('resize')

  if (resize) {
    resize.unbind()
  }

  // Not started. Begin interaction.
  resize = new RealignView(this)
  this.addInteraction('resize', resize)

  return this
}
