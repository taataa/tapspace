module.exports = function () {
  // @tapspace.interaction.Tap:bind()
  //
  // Bind gesture event listeners.
  //
  if (this.bound) {
    return true
  }
  this.bound = true

  const self = this

  // Construct listeners
  this.ongesturestart = (ev) => {
    if (self.bound) {
      self.target.element.classList.add('active-tap')
      self.source.emit('tapstart', ev)
    }
  }
  this.ongestureend = (ev) => {
    if (self.bound) {
      self.target.element.classList.remove('active-tap')
      if (ev.travel <= self.options.maxTravel) {
        self.source.emit('tapend', ev)
        self.source.emit('tap', ev)
      } else {
        self.source.emit('tapcancel', ev)
      }
    }
  }
  this.ongesturecancel = (ev) => {
    if (self.bound) {
      self.target.element.classList.remove('active-tap')
      self.source.emit('tapcancel', ev)
    }
  }

  // Pass capturer options
  const capturerOptions = { preventDefault: this.options.preventDefault }

  // Bind listeners to the component capturer
  this.capturer = this.source.capturer('gesture', capturerOptions)
  this.capturer.on('gesturestart', this.ongesturestart)
  this.capturer.on('gestureend', this.ongestureend)
  this.capturer.on('gesturecancel', this.ongesturecancel)
}
