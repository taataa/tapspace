module.exports = function (url, levels) {
  // @Viewport:setRollingBackground(url, levels)
  //
  // Start an infinity-simulating, scale-free, background rolling.
  //
  // Parameters:
  //   url
  //   levels
  //
  // Alternative parameters
  //   enabled
  //     a boolean, false to disable the rolling background effect.
  //
  // Return
  //   this, for chaining
  //
  const element = this.element

  if (typeof url === 'boolean' && !url) {
    // Disable the background
    element.style.removeProperty('background-image')
    element.style.removeProperty('background-position')
    element.style.removeProperty('background-size')

    // Detach
    this.off('idle', this.backgroundHandler)
    this.backgroundHandler = null

    return
  }

  if (this.backgroundHandler) {
    // Already set. Clean up before reset.
    this.off('idle', this.backgroundHandler)
    this.backgroundHandler = null
  }

  if (typeof url === 'string') {
    element.style.backgroundImage = 'url(' + url + ')'
    this.backgroundHandler = () => {
      element.style.backgroundPosition = '0px 0px'
      element.style.backgroundSize = '100%'
    }
    // Set immediately and begin updating from time to time.
    this.backgroundHandler()
    this.on('idle', this.backgroundHandler)
  }
}
