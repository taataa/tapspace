module.exports = function () {
  // @Component:requestIdle()
  //
  // Targeted for internal use.
  //
  // Ask component to emit an idle event.
  // The idle events are used for computationally heavy tasks.
  // Therefore this method attempts to limit the frequency of idle events
  // by throttling and respecting ongoing animations.
  //
  // Return
  //   this, for chaining
  //

  if (this.idleTimeout) {
    clearTimeout(this.idleTimeout)
  }

  this.idleTimeout = setTimeout(() => {
    if (!this.ontransitionend) {
      this.emit('idle')
    }
    // else idle will be requested later in ontransitionend
  }, 150)

  return this
}
