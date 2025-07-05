module.exports = function () {
  // @tapspace.interaction.WheelZoom:unbind()
  //
  // Unbind listeners.
  //
  if (this.bound) {
    this.bound = false
    // Unbind the interaction from the capturer.
    const capturer = this.source.capturer('wheel')
    capturer.off('wheel', this.onwheel)
    this.onwheel = null
  }
}
