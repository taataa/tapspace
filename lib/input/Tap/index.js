const emitter = require('component-emitter')

const TapGesture = function (capturer, options) {
  // Parameters:
  //   capturer
  //   options
  //     maxTravel, default 20
  //
  if (!options) {
    options = {}
  }
  options = Object.assign({
    maxTravel: 20
  }, options)

  emitter(this)
  const self = this

  capturer.on('gestureend', (ev) => {
    if (ev.travel < options.maxTravel) {
      self.emit('tap', ev)
    }
  })
}

module.exports = TapGesture
