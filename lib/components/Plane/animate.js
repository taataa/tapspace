const applyTransition = require('./utils/applyTransition')

module.exports = function (options) {
  // @Plane:animate(options)
  //
  // Update CSS transition animation properties of the component.
  //
  // Parameters:
  //   options
  //     boolean or optional object with properties:
  //       duration
  //         optional string. The transition-duration value, e.g. '500ms' or '2s'.
  //         .. Default is '200ms'.
  //       easing
  //         optional string. The transition-timing-function, e.g. 'linear' or
  //         ..'cubic-bezier(0.33, 1, 0.68, 1)'. Default is 'ease'.
  //       delay
  //         optional string. The transition-delay value, e.g. '500ms' or '2s'.
  //         .. Default is '0ms'.
  //     If boolean false, animation becomes disabled.
  //
  // Return
  //   this, for chaining
  //
  if (options === false) {
    this.element.style.removeProperty('transition')
  } else {
    applyTransition(this.element, options)
  }

  return this
}
