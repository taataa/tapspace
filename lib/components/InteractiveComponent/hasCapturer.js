module.exports = function (capturerName) {
  // @InteractiveComponent:hasCapturer(capturerName)
  //
  // Test if the component has an active capturer.
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
    return true
  }

  return false
}
