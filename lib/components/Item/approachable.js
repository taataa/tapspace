const Approach = require('../../interaction/Approach')

module.exports = function (options) {
  // @Item:approachable(options)
  //
  // Make the item reactive to camera proximity.
  //
  // Parameters:
  //   options
  //     optional object with properties:
  //       threshold
  //         optional number in viewport pixels. Default is 1000.
  //         .. The radial distance between the item anchor and the camera.
  //         .. Within this distance, the item is being approached.
  //
  // Alternative parameters:
  //   options
  //     a boolean. Set false to disable the ability.
  //
  // Makes the item emit:
  //   approachstart
  //     when camera enters the threshold distance.
  //   approachend
  //     when camera exits the threshold distance.
  //
  // Return
  //   this, for chaining
  //

  // False to unbind
  if (options === false) {
    this.removeInteraction('approach')
    return this
  }

  // Begin tap interaction
  const interaction = new Approach(this, this, options)
  this.addInteraction('approach', interaction)

  return this
}
