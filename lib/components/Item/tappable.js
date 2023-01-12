const Tap = require('../../interaction/Tap')

module.exports = function (options) {
  // @Item:tappable(options)
  //
  // Make item tappable i.e. make it emit tap events.
  // See tapspace.interaction.Tap for details.
  //
  // Parameters:
  //   options
  //     optional object with properties:
  //       maxTravel
  //         optional number in viewport pixels. default 20.
  //       preventDefault
  //         a boolean
  //           true to prevent further action after tap.
  //           false to let ancestors consume the events.
  //
  // Makes the component emit events:
  //   tap
  //   tapstart
  //   tapcancel
  //   tapend
  //
  // Return
  //   this, for chaining
  //

  // False to unbind
  if (options === false) {
    this.removeInteraction('tap')
    return this
  }

  // Begin tap interaction
  const tap = new Tap(this, this, options)
  this.addInteraction('tap', tap)

  return this
}
