module.exports = function () {
  // tapspace.interaction.Pinch:unbind()
  //
  // Unbind listeners and stop the ongoing gesture if any.
  //
  if (this.bound) {
    this.bound = false
    // Unbind the interaction from the capturer.
    this.capturer.off('gesturstart', this.ongesturstart)
    this.capturer.off('gesturemove', this.ongesturemove)
    this.capturer.off('gestureend', this.ongestureend)
    this.capturer.off('gesturecancel', this.ongesturecancel)
    // Help garbage collector
    this.capturer = null
    this.ongesturestart = null
    this.ongesturemove = null
    this.ongestureend = null
    this.ongesturecancel = null
    // Maybe unbound during gesture thus reset styling.
    this.target.element.classList.remove('active-pinch')
  }
}
