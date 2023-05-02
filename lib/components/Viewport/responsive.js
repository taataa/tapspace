const RealignView = require('../../interaction/RealignView')

module.exports = function (enable) {
  // @Viewport:responsive([enable])
  //
  // Make the viewport responsive to container size changes.
  // A responsive viewport keeps its anchor and perspective origin
  // at the same relative position with respect to its size.
  //
  // Viewports are responsive by default. Use this method to disable
  // or re-enable the responsivity.
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
