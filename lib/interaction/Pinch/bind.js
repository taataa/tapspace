module.exports = function () {
  // @tapspace.interaction.Pinch:bind()
  //
  // Bind gesture event listeners.
  //
  if (this.bound) {
    return
  }
  this.bound = true

  // Pass 'this' for handlers.
  const self = this

  this.ongesturestart = (ev) => {
    // Mark as active. TODO allow custom class name
    self.target.element.classList.add('active-pinch')
    self.source.emit('pinchstart', ev)
  }
  this.ongesturemove = (ev) => {
    // DEBUG
    // console.log('pivot', ev.center.point)
    // console.log('freedom', self.capturer.getFreedom())
    // console.log('ev.delta', ev.delta.helm)
    self.applyTransform(ev)
    self.source.emit('pinchmove', ev)
    self.source.emit('pinch', ev)
  }
  this.ongestureend = (ev) => {
    // Deactivate styling, for example grabbing cursor
    self.target.element.classList.remove('active-pinch')
    self.source.emit('pinchend', ev)
  }
  this.ongesturecancel = (ev) => {
    // TODO Return the target to the original position
    // TODO by using the total transform.
    self.target.element.classList.remove('active-pinch')
    self.source.emit('pinchcancel', ev)
  }

  // Capturer options determine the gesture freedom.
  const capturerOptions = {}
  if (this.options.freedom) {
    capturerOptions.freedom = this.options.freedom
  }
  // Bind listeners to the component capturer.
  this.capturer = this.source.capturer('gesture', capturerOptions)
  this.capturer.on('gesturestart', this.ongesturestart)
  this.capturer.on('gesturemove', this.ongesturemove)
  this.capturer.on('gestureend', this.ongestureend)
  this.capturer.on('gesturecancel', this.ongesturecancel)
}
