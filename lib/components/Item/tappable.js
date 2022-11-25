const Tap = require('../../interaction/Tap')

module.exports = function (options) {
  // @Item:tappable(options)
  //
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
    this.removeInteraction('tap')
    return
  }

  // Begin tap interaction
  const tap = new Tap(this, this, options)
  this.addInteraction('tap', tap)

  return this
}
