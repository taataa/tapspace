const emitter = require('component-emitter')
const Sensor = require('./Sensor')

const TransformCapturer = function (element, mode) {
  // Begin to capture and recognize pointer gestures
  // on the given element and emit them as gesture events.
  //
  // Parameters
  //   element
  //     HTMLElement to listen.
  //
  // Emits
  //   gesturestart
  //   gesturemove
  //   gestureend
  //

  emitter(this)
  const self = this

  // Track the duration of the gesture.
  let startTime = null
  // Track the travelling distance of the pointers.
  let totalTravel = null
  // Track which pointers are active and where they are on the element.
  let pointersOnElement = {}
  // Track where pointers first appeared on the element.
  let entryPoints = {}

  const onStart = (firstPointers) => {
    self.emit('gesturestart', {
      distance: 0,
      duration: 0, // ms
      element: element,
      transform: I,
    })
  }

  const onMove = (prevPointers, nextPointers) => {
    self.emit('gesturemove', {
      distance:
      duration:
      element: element,
      transform:
    })
  }

  const onEnd = (lastPointers) => {
    self.emit('gestureend', {
      distance:
      duration:
      element: element,
      transform:
    })
  }

  this.sensor = new Sensor(element, {
    onstart: onStart,
    onmove: onMove,
    onend: onEnd
  })
}

module.exports = TransformCapturer
