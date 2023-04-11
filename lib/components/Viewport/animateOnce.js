module.exports = function (options) {
  // @Viewport:animateOnce(options)
  //
  // Animate the next viewport transform.
  //
  // Parameters:
  //   options
  //     optional object with properties
  //       duration
  //         optional string. The transition-duration value,
  //         .. e.g. '500ms' or '2s'.
  //         .. Default is '200ms'.
  //       easing
  //         optional string. The transition-timing-function,
  //         .. e.g. 'linear' or
  //         ..'cubic-bezier(0.33, 1, 0.68, 1)'. Default is 'ease'.
  //       delay
  //         optional string. The transition-delay value, e.g.
  //         .. '500ms' or '2s'.
  //         .. Default is '0ms'.
  //
  // Return
  //   this, for chaining
  //
  const spaces = this.hyperspace.getChildren()

  for (let i = 0; i < spaces.length; i += 1) {
    const space = spaces[i]
    space.animateOnce(options)
  }

  return this
}
