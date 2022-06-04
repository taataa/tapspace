const emitter = require('component-emitter')

const TapGesture = function (capturer, options) {
  // Parameters:
  //   capturer
  //   options
  //     effect
  //       string, one of 'shrink', 'shake', 'down'
  //     maxTravel
  //       optional number in viewport pixels. default 20.
  //
  if (!options) {
    options = {}
  }
  options = Object.assign({
    maxTravel: 20
  }, options)

  emitter(this)
  const self = this

  this.ongestureend = null
}

module.exports = TapGesture
const proto = TapGesture.prototype

proto.bind = function (capturer, options) {
  this.ongestureend = (ev) => {
    if (ev.travel < options.maxTravel) {
      self.emit('tap', ev)
    }
  }
  capturer.on('gestureend', this.ongestureend)
}

proto.unbind = function () {
  capturer.off('gestureend', this.ongestureend)
  this.ongestureend = null
}
