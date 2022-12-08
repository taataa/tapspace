const emitter = require('component-emitter')
const emitCameraEvent = require('./emitCameraEvent')

const CameraCapturer = function (plane) {
  // @CameraCapturer(plane)
  //
  // Captures viewport moves towards and away from the plane anchor.
  // Meant for semantic zoom features.
  //
  // Emits:
  // - cameraenter
  //   - when camera is moving closer
  // - cameraleave
  //   - when camera is moving farther
  //
  this.target = plane

  const view = plane.getViewport()
  if (!view) {
    throw new Error('plane must be connected to a viewport ' +
      'in order to use distance capturing.')
  }
  this.viewport = view

  // Inherit
  emitter(this)

  // Measure distance change
  this.previousDistance = null
  // Shell index
  this.previousShell = null
  // May send camera event on vieport idle
  this.onidle = emitCameraEvent(this)

  this.bind()
}

module.exports = CameraCapturer

const proto = CameraCapturer.prototype

proto.bind = function () {
  // @CameraCapturer:bind()
  //
  // Attach viewport move listeners.
  //
  this.viewport.on('idle', this.onidle)
}

proto.unbind = function () {
  // @CameraCapturer:unbind()
  //
  // Detach viewport move listeners.
  //
  this.viewport.off('idle', this.onidle)
}