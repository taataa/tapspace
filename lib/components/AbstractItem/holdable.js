const Hold = require('../../interaction/Hold')

module.exports = function (options) {
  // tapspace.components.AbstractItem:holdable(options)

  // False to unbind
  if (options === false) {
    this.removeInteraction('hold')
    return
  }

  // Begin hold interaction.
  const hold = new Hold(this, this, options)
  this.addInteraction('hold', hold)

  return this
}
