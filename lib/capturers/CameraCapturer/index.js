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
  // **Under the hood:**
  // The viewport iterates planes when necessary and checks if the plane
  // has an active camera capturer. If so, the viewport is responsible
  // of informing the camera capturer about the camera movement.
  // This way the plane can be connected to viewport later, not necessarily
  // at setup phase.
  //
  this.target = plane
  this.bound = false

  // Inherit
  emitter(this)

  // Measure distance change
  this.previousDistance = null
  // Shell index
  this.previousShell = null
  // May send camera event on vieport idle
  this.onmeasured = emitCameraEvent(this)
}

module.exports = CameraCapturer

const proto = CameraCapturer.prototype

proto.bind = function () {
  // @CameraCapturer:bind()
  //
  // Attach viewport move listeners.
  //
  if (this.bound) {
    return
  }

  this.bound = true
  this.target.on('measured', this.onmeasured)
}

proto.unbind = function () {
  // @CameraCapturer:unbind()
  //
  // Detach viewport move listeners.
  //
  if (!this.bound) {
    return
  }

  this.bound = false
  this.target.off('measured', this.onmeasured)
}
