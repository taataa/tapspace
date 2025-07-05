const onwheel = require('./onwheel')

module.exports = function () {
  // @tapspace.interaction.WheelZoom:bind()
  //
  // Bind event listeners
  //
  if (this.bound) {
    return
  }
  this.bound = true

  // Create event handler
  this.onwheel = onwheel(this.source, this.target, this.options)

  // Listen capturer
  const capturer = this.source.capturer('wheel')
  capturer.on('wheel', this.onwheel)
}
