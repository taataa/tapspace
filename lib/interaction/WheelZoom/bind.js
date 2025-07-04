const onwheel = require('./onwheel')

module.exports = function () {
  // @tapspace.interaction.WheelZoom:bind()
  //
  // Bind event listeners
  //
  if (this.bound) {
    return this
  }
  this.bound = true

  // Event handler
  this.onwheel = onwheel(this.viewport)

  // Listen capturer
  const capturer = this.viewport.capturer('wheel')
  capturer.on('wheel', this.onwheel)
}
