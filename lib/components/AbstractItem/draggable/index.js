const Pinch = require('../../../interaction/Pinch')
const nextFreedom = require('./nextFreedom')

module.exports = function (opts) {
  // tapspace.components.AbstractItem:draggable(opts)
  // tapspace.components.AbstractItem:pannable
  //
  // Make item draggable.
  // The item can be moved freely by a set of pointers.
  // The item maintains the size and the angle.
  //
  // Parameters:
  //   opts, various types
  //     a boolean. Set false to disable draggability.
  //
  // Return
  //   this, for chaining
  //

  // NOTE Draggable is better term than movable because
  // movable is meaningful in two sense: moveable programmatically
  // or moveable physically by user.
  //

  // False to unbind
  if (opts === false) {
    if (this.interactions.pinch) {
      this.interactions.pinch.unbind()
      delete this.interactions.pinch
    }
    return
  }

  // Find existing interaction
  let pinch = this.interactions.pinch
  // Default freedom mode
  let freedom = {
    type: 'T'
  }

  if (pinch) {
    // Set freedom based on previous freedom.
    const exfreedom = pinch.getFreedom()
    freedom = nextFreedom(exfreedom, freedom)
    // Reset
    pinch.unbind()
  }

  // Begin interaction
  pinch = new Pinch(this, this, {
    freedom: freedom
  })
  pinch.bind()
  this.interactions.pinch = pinch

  return this
}
