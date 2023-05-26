module.exports = function (newOptions) {
  // @tapspace.interaction.Tap:update(newOptions)
  //
  // Parameters:
  //   newOptions
  //     an object, with optional properties. See GestureCapturer:update
  //
  if (this.capturer) {
    this.capturer.update(newOptions)
  }
}
