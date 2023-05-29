module.exports = function (elem, params) {
  // @TransformerComponent.dom.applyTransition(el, params)
  //
  // Update transition animation properties of an element.
  //
  // Parameters:
  //   elem
  //     an HTMLElement
  //   params
  //     duration
  //       optional string. The transition-duration value, e.g. '500ms' or '2s'.
  //       .. Default is '200ms'.
  //       optional integer. Microseconds, ms.
  //     easing
  //       optional string. The transition-timing-function, e.g. 'linear' or
  //       ..'cubic-bezier(0.33, 1, 0.68, 1)'. Default is 'ease'.
  //     delay
  //       optional string. The transition-delay value, e.g. '500ms' or '2s'.
  //       .. Default is '0ms'.
  //       optional integer. Microseconds, ms.
  //

  let duration = '200ms'
  let easing = 'ease'
  let delay = '0ms'

  switch (typeof params.duration) {
    case 'string':
      duration = params.duration
      break
    case 'number':
      duration = Math.round(params.duration) + 'ms'
      break
    case 'undefined':
      break
    default:
      throw new Error('Invalid duration: ' + params.duration)
  }

  switch (typeof params.easing) {
    case 'string':
      easing = params.easing
      break
    case 'undefined':
      break
    default:
      throw new Error('Invalid easing: ' + params.easing)
  }

  switch (typeof params.delay) {
    case 'string':
      delay = params.delay
      break
    case 'number':
      delay = Math.round(params.delay) + 'ms'
      break
    case 'undefined':
      break
    default:
      throw new Error('Invalid delay: ' + params.delay)
  }

  elem.style.transition = 'transform ' +
    duration + ' ' + easing + ' ' + delay
}
