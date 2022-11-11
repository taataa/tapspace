const Hold = require('../../interaction/Hold')

module.exports = function (options) {
  // tapspace.components.AbstractItem:holdable(options)

  // False to unbind
  if (options === false) {
    if (this.interactions.hold) {
      this.interactions.hold.unbind()
      delete this.interactions.hold
    }
    return
  }

  // Cannot replace old interaction
  if (this.interactions.hold) {
    throw new Error('The element already has an active hold interaction.')
  }

  // Begin hold interaction.
  const hold = new Hold(this, this, options)
  this.interactions.hold = hold
  hold.bind()

  return this
}
