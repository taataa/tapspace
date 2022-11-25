const capturers = {
  gesture: require('./capturers/GestureCapturer'),
  keyboard: require('./capturers/KeyboardCapturer'),
  resize: require('./capturers/ResizeCapturer'),
  wheel: require('./capturers/WheelCapturer')
}

module.exports = function (capturerName, opts) {
  // @Interactive:capturer(capturerName, opts)
  //
  // Get or create an input capturer.
  // For Tapspace internal use.
  //
  // Parameters:
  //   capturerName
  //     a string. One of 'gesture', 'keyboard', 'wheel'
  //   opts
  //     options for the capturer.
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
  const Capturer = capturers[capturerName]
  if (Capturer) {
    const newCap = new Capturer(this, opts)
    this.capturers[capturerName] = newCap
    return newCap
  }

  throw new Error('Unknown capturer: ' + capturerName)
}
