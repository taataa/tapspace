module.exports = function (capturerName) {
  // @Interactive:stopCapturer(capturerName)
  //
  // Remove element listeners and the capturer.
  //
  // Parameters:
  //   capturerName
  //     a string, for example 'wheel'
  //
  // Return
  //   this, for chaining
  //
  const capturer = this.capturers[capturerName]

  if (capturer) {
    capturer.unbind()
    delete this.capturers[capturerName]
  }

  return this
}
