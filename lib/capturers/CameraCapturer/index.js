const Capturer = require('../Capturer')
const createCameraHandler = require('./createCameraHandler')

const CameraCapturer = function (component) {
  // @CameraCapturer(component)
  //
  // Inherits Capturer
  //
  // Captures viewport moves towards and away from the plane anchor.
  // Meant for semantic zoom features.
  //
  // Parameters:
  //   component
  //     a Component, the component to capture.
  //
  // Emits:
  // - cameraenter
  //   - when camera is moving closer
  // - cameraleave
  //   - when camera is moving farther
  // - camerain
  //   - when the camera zooms in
  // - cameraout
  //   - when the camera zooms out
  //
  // **Under the hood:**
  // The viewport iterates planes when necessary and checks if the plane
  // has an active camera capturer. If so, the viewport is responsible
  // of informing the camera capturer about the camera movement.
  // This way the plane can be connected to viewport later, not necessarily
  // at setup phase.
  //

  // Inherit
  Capturer.call(this)

  // Validate component
  if (!component || !component.tran) {
    throw new Error('Invalid component')
  }
  this.component = component

  this.bound = false

  // Measure distance change
  this.previousDistance = null
  // Measure depth change
  this.previousDepth = null
  // Function to call on a measure
  this.onmeasure = null
}

module.exports = CameraCapturer

const proto = CameraCapturer.prototype

// Inherit
Object.assign(proto, Capturer.prototype)

// Methods

proto.bind = function () {
  // @CameraCapturer:bind()
  //
  // Attach listeners.
  //
  if (this.bound) {
    return
  }
  this.bound = true

  this.onmeasure = createCameraHandler(this)
}

proto.update = function () {
  throw new Error('Not implemented.')
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

  this.previousDistance = null
  this.previousDepth = null
  this.onmeasure = null

  // The clients of the capturer could have registered
  // listeners. We close them because the capturer is destroyed.
  this.off()
}
