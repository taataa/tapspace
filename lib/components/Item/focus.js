module.exports = function (options) {
  // @Item:focus(options)
  //
  // Give focus to the item and optionally move viewport to look at it.
  //
  // Parameters:
  //   options
  //     optional object with properties:
  //       aperture
  //         TODO optional number
  //       focusVisible
  //         optional boolean. Default false.
  //         .. Passed to element.focus.
  //         .. Set true to ensure a focus outline, for example a blue border,
  //         .. is applied to the element by the browser.
  //         .. Set false for automatic behavior.
  //         .. Control the appearance via CSS *focus-visible* pseudo-class.
  //       preventScroll
  //         optional boolean. Default false.
  //         .. False to move the viewport to ensure the item is visible.
  //         .. True to prevent viewport being moved. The item might
  //         .. stay outside viewport and cannot be seen by the user.
  //
  // Return:
  //   this, for chaining
  //

  // DEV NOTE: focus() is a member of Item because WHATWG recommends
  // that only interactive elements should be focusable. The Interactive
  // component has dummy .focus() that needs to be implemented by subclasses.

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

  if (!preventScroll) {
    const viewport = this.getViewport()
    viewport.translateTo(this.atAnchor())
  }

  this.element.focus({
    focusVisible: focusVisible,
    preventScroll: preventScroll
  })

  return this
}
