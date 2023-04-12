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
  //     easing
  //       optional string. The transition-timing-function, e.g. 'linear' or
  //       ..'cubic-bezier(0.33, 1, 0.68, 1)'. Default is 'ease'.
  //     delay
  //       optional string. The transition-delay value, e.g. '500ms' or '2s'.
  //       .. Default is '0ms'.
  //
  params = Object.assign({
    duration: '200ms',
    easing: 'ease',
    delay: '0ms'
  }, params)

  elem.style.transition = 'transform ' +
    params.duration + ' ' +
    params.easing + ' ' +
    params.delay
}