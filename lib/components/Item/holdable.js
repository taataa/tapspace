const Hold = require('../../interaction/Hold')

module.exports = function (options) {
  // @Item:holdable(options)
  //
  // Make the item holdable and emit hold events. See interaction.Hold.
  //
  // Return
  //   this, for chaining
  //

  // False to unbind
  if (options === false) {
    this.removeInteraction('hold')
    return this
  }

  // Begin hold interaction.
  const hold = new Hold(this, this, options)
  this.addInteraction('hold', hold)

  return this
}
