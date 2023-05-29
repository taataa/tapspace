module.exports = function () {
  // The idle event is fired when a gesture or animation (TODO?) finishes.
  // The idle means that the component has finished active transformation.
  // We do not want multiple idle sources causing multiple concurrent idle
  // events, thus we provide requestIdle method to group them by throttling.

  if (this.idleThrottled) {
    return this
  }

  this.idleThrottled = true
  setTimeout(() => {
    this.idleThrottled = false

    if (!this.ontransitionend) {
      this.emit('idle')
    }
    // else the idle will be emitted in ontransitionend
  }, 500)

  return this
}
