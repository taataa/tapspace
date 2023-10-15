const DEVICES = ['pointer', 'wheel']

module.exports = function (device) {
  // @Interactive:setContentInput([device0, device1, ...])
  //
  // Enable interactions with the content inside item instead of the item.
  // Select which devices (event sources) become dedicated for the content.
  // Devices that were not selected, become dedicated for the affine item
  // and its affine ancestors. Set `false` to disable all interaction with
  // the content.
  //
  // **Example 1:** Item has scrollable content that should scroll instead
  // of the viewport zooming in or out.
  // ```
  // item.setContentInput('wheel')
  // ```
  // **Example 2:** Item contains selectable text, forms, or links that should
  // be interactive instead of the viewport panning.
  // ```
  // item.setContentInput('pointer')
  // ```
  // **Example 3:** Item content should not be interactive. All input should
  // go to the item, for example if the item is draggable, or further to
  // the viewport.
  // ```
  // item.setContentInput(false)
  // ```
  //
  // Parameters:
  //   device0
  //     a string, a device name. Available device names: `wheel`, `pointer`.
  //   device1
  //     optional string. Another device name.
  //
  // Alternative parameters:
  //   enabled
  //     a boolean. Set true to enable all interaction with the content.
  //     .. Set false to disable all interaction with the content.
  //     .. True will enable all devices on content and false does the opposite.
  //
  // Return
  //   this, for chaining.
  //

  const classList = this.element.classList

  if (typeof device === 'boolean') {
    if (device) {
      // Allow all; Remove all proxies.
      const len = DEVICES.length
      for (let i = 0; i < len; i += 1) {
        classList.remove('affine-proxy-' + DEVICES[i])
      }
    } else {
      // Disable all; Add all proxies.
      const len = DEVICES.length
      for (let i = 0; i < len; i += 1) {
        classList.add('affine-proxy-' + DEVICES[i])
      }
    }

    return this
  }

  // Add proxies for devices that are not in arguments.
  const len = DEVICES.length
  const arglen = arguments.length
  for (let i = 0; i < len; i += 1) {
    let enableDevice = false

    for (let j = 0; j < arglen; j += 1) {
      if (DEVICES[i] === arguments[j]) {
        // Arguments has a device.
        enableDevice = true
        break
      }
    }

    if (enableDevice) {
      classList.remove('affine-proxy-' + DEVICES[i])
    } else {
      classList.add('affine-proxy-' + DEVICES[i])
    }
  }

  return this
}
