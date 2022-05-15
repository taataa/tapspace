const applyTransition = require('./utils/applyTransition')
const applyTransform = require('./utils/applyTransform')
const applyTransform3d = require('./utils/applyTransform')

module.exports = function (opts) {
  // You need to call this function only when you have manually edited
  // the component.proj property.
  //
  // Update the element.style.transform according to the plane placement
  // and optionally element.style.transition if you want animation.
  //
  //
  // Parameters:
  //   opts
  //     transition, optional object with props:
  //       duration
  //         optional string. The transition-duration value,
  //         .. e.g. '500ms' or '2s'. Default is '200ms'.
  //       easing
  //         optional string. The transition-timing-function, e.g. 'linear' or
  //         ..'cubic-bezier(0.33, 1, 0.68, 1)'. Default is 'ease'.
  //       delay
  //         optional string. The transition-delay value,
  //         .. e.g. '500ms' or '2s'. Default is '0ms'.
  //

  // TODO maybe set via separate property?
  if (opts.transition) {
    applyTransition(this.element, opts.transition)
  }

  if (this.proj.z) {
    applyTransform3d(this.element, this.proj)
  } else {
    applyTransform(this.element, this.proj)
  }
}
