module.exports = function (options) {
  // @tapspace.interaction.KeyboardPan:update(options)
  //
  // Update panning options.
  //
  // Parameters:
  //   options
  //     an object with properties:
  //       step
  //         optional number or Distance
  //       arrows
  //         optional boolean
  //       wasd
  //         optional boolean
  //

  if (!options) {
    return
  }

  // Assume default options are already set.

  if (typeof options.step === 'object') {
    if (options.step.transitRaw) {
      // a Distance
      this.step = options.step.transitRaw(this.target)
    } else {
      throw new Error('Invalid step distance')
    }
  } else if (typeof options.step === 'number') {
    this.step = options.step
  }

  if (typeof options.arrows === 'boolean') {
    this.enableArrows = options.arrows
  }

  if (typeof options.wasd === 'boolean') {
    this.enableWasd = options.wasd
  }
}
