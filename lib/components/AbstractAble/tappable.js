const Tap = require('../../interaction/Tap')

module.exports = function (options) {
  // Make item tappable i.e. make it emit tap events.
  //
  // Parameters:
  //   options
  //     optional object with properties
  //       TODO
  //
  // Makes the component emit events:
  //   tap
  //   tapstart
  //   tapend
  //
  // Return
  //   this, for chaining
  //

  // False to unbind
  if (options === false) {
    if (this.interactions.tap) {
      this.interactions.tap.unbind()
      this.interactions.tap = null
    }
    return
  }

  // Cannot replace old interaction
  if (this.interactions.tap) {
    throw new Error('The element already has tap interaction set.')
  }

  // Begin tap interaction
  const tap = new Tap(this, this, options)
  tap.bind()
  this.interactions.tap = tap

  return this
}
