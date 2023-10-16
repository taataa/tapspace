module.exports = function (options) {
  // @Interactive:focusable(options)
  //
  // Make the item focusable. This means that the item can receive
  // keyboard events, steal focus from other elements, be reachable by tabbing,
  // and be visually outlined. Item must be focusable in order to use
  // Interactive:focus successfully. Call focusable(false) to disable
  // the ability.
  //
  // Parameters:
  //   options
  //     optional object with properties:
  //       tabindex
  //         optional integer. Default is 0.
  //         .. Set -1 to make the component unreachable by tabbing.
  //         .. Set 0 to make the component reachable by tabbing in
  //         .. the order defined by the position in DOM.
  //         .. Set to a positive integer, like 3, to control the tabbing order.
  //
  // Return
  //   this, for chaining
  //

  // Handle disabling
  if (options === false) {
    this.element.removeAttribute('tabindex')
    return this
  }

  // Handle options
  if (!options) {
    options = {}
  }
  let tabindex = 0
  if (typeof options.tabindex === 'number') {
    tabindex = Math.floor(options.tabindex)
    if (tabindex < 0) {
      tabindex = -1
    }
  }

  // According to MDN, setting tabindex attribute makes any element focusable.
  this.element.setAttribute('tabindex', tabindex)

  return this
}
