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
  // Function to call on a measure
  this.onmeasure = null
}

module.exports = CameraCapturer

const proto = CameraCapturer.prototype

proto.bind = function () {
  // @CameraCapturer:bind()
  //
  // Attach listeners.
  //
  if (this.bound) {
    return
  }

  this.bound = true
  this.onmeasure = emitCameraEvent(this)
}

proto.unbind = function () {
  // @CameraCapturer:unbind()
  //
  // Detach listeners.
  //
  if (!this.bound) {
    return
  }

  this.bound = false
  this.onmeasure = null
}
