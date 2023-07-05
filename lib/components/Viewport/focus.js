module.exports = function (options) {
  // @Viewport:focus(options)
  //
  // Give focus to viewport. This enables keyboard navigation.
  //
  // Parameters:
  //   options
  //     optional object with properties:
  //       focusVisible
  //         optional boolean. Default false.
  //         .. Set true to outline the viewport in the page
  //         .. to communicate it has the focus.
  //         .. Set false for automatic behavior.
  //         .. ControlComponent the appearance via CSS *focus-visible* pseudo-class.
  //       preventScroll
  //         optional boolean. Default false.
  //         .. False to scroll the page to ensure the viewport is visible.
  //         .. True to prevent the page being scrolled.
  //
  // Return:
  //   this, for chaining
  //

  // Handle options
  if (!options) {
    options = {}
  }
  let focusVisible = false
  if (typeof options.focusVisible === 'boolean') {
    focusVisible = options.focusVisible
  }
  let preventScroll = false
  if (typeof options.preventScroll === 'boolean') {
    preventScroll = options.preventScroll
  }

  this.element.focus({ focusVisible, preventScroll })

  return this
}
