module.exports = function () {
  // @tapspace.interaction.Tap:unbind()
  //
  // Unbind capturer.
  //
  if (this.bound) {
    this.bound = false
    this.capturer.off('gesturstart', this.ongesturstart)
    this.capturer.off('gestureend', this.ongestureend)
    this.capturer.off('gesturecancel', this.ongesturecancel)
    this.capturer = null
    this.ongesturestart = null
    this.ongestureend = null
    this.ongesturecancel = null
  }
}
