module.exports = function () {
  // The idle event is fired when a gesture or animation (TODO?) finishes.
  // The idle means that the component has finished active transformation.
  // We do not want multiple idle sources causing multiple concurrent idle
  // events, thus we provide requestIdle method to group them by throttling.

  if (this.idleBucket > 0) {
    this.idleBucket += 1
    return this
  }

  // Set up a throttling period.
  // During this period further idle requests are aggregated
  this.idleBucket = 1
  setTimeout(() => {
    if (this.idleBucket > 1) {
      // There was queued idle requests.
      this.idleBucket = 0
      if (!this.ontransitionend && !this.hyperspace.ontransitionend) {
        this.emit('idle')
      }
      // else the idle will be re-requested in ontransitionend
    } else {
      // There was no queued idle requests.
      this.idleBucket = 0
    }
  }, 1000)

  // Call immediately
  if (!this.ontransitionend && !this.hyperspace.ontransitionend) {
    this.emit('idle')
  }

  return this
}
