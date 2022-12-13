module.exports = function (capturerName) {
  // @Interactive:getCapturer(capturerName)
  //
  // Get specific capturer if the component has one. Null if does not.
  //
  // Parameters:
  //   capturerName
  //     a string, for example 'wheel'
  //
  // Return
  //   a Capturer, or null if not available.
  //
  const capturer = this.capturers[capturerName]

  if (capturer) {
    return capturer
  }

  return null
}
