const Slide = require('../../interaction/Slide')

module.exports = function (opts) {
  // tapspace.components.AbstractItem:slidable(opts)
  // tapspace.components.AbstractItem:slideable(opts)
  //
  // The component can be moved along a line, with limits.
  //
  // Parameters:
  //   opts
  //     angle
  //       a number, angle in radians
  //     min
  //       a number, a distance to the right half of the unit circle.
  //     max
  //       a number, a distance to the left half of the unit circle.
  //
  this.interactions.slide = new Slide(this, this, opts)
}
