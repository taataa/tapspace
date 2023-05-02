const capturerClasses = require('../../capturers')

module.exports = function (capturerName, opts) {
  // @InteractiveComponent:capturer(capturerName, opts)
  // @InteractiveComponent:startCapturer(capturerName, opts)
  // @InteractiveComponent:updateCapturer(capturerName, opts)
  // @InteractiveComponent:getCapturer(capturerName)
  //
  // Get or create an input capturer.
  // For Tapspace internal use.
  //
  // Parameters:
  //   capturerName
  //     a string. One of 'gesture', 'keyboard', 'resize', 'wheel'
  //   opts
  //     options for the capturer. Optional.
  //
  // Returns
  //   a capturer
  //

  // Get if active.
  const runningCap = this.capturers[capturerName]
  if (runningCap) {
    // Capturer active.
    // If options were given, update the options.
    if (opts) {
      runningCap.update(opts)
    }
    return runningCap
  }

  // Capturer is not active. Create the capturer.
  const Capturer = capturerClasses[capturerName]

  if (!Capturer) {
    throw new Error('Unknown capturer: ' + capturerName)
  }

  const newCap = new Capturer(this, opts)
  newCap.bind()

  this.capturers[capturerName] = newCap

  // Begin tracking for idle event
  switch (capturerName) {
    // case 'camera':
    //   the camera events are themselves driven by idle event.
    case 'gesture':
      newCap.on('gestureend', this.requestIdle)
      newCap.on('gesturecancel', this.requestIdle)
      break
    case 'resize':
      newCap.on('resize', this.requestIdle)
      break
    case 'wheel':
      newCap.on('wheel', this.requestIdle)
      break
    default:
      break
  }

  return newCap
}
