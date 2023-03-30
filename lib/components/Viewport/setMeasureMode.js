const MODES = ['none', 'lazy', 'busy']

module.exports = function (measureMode) {
  // @Viewport:setMeasureMode(measureMode)
  //
  // A measure mode makes the viewport actively measure plane distances and
  // areas. The act of measuring is necessary for interactions
  // that use CameraCapturer, such as the Approach interaction.
  //
  // Parameters:
  //   measureMode
  //     an enum string, one of `none`, `lazy`, `busy`.
  //
  // Measure modes:
  //   `none`: viewport does no measuring. Interactions that depend on
  //           .. camera distance will not receive measure data.
  //   `lazy`: viewport measures when idle, after the gestures.
  //           .. This is the preferred mode for its lightness.
  //   `busy`: viewport measures after each move (~30 fps).
  //           .. This mode can be computationally heavy and thus
  //           .. make navigation sluggish.
  //
  // Return
  //   this, for chaining
  //

  // Validate
  if (MODES.indexOf(measureMode) < 0) {
    throw new Error('Invalid measure mode: ' + measureMode)
  }

  // Skip if mode already set.
  if (this.measureMode === measureMode) {
    return this
  }

  // Clear previous mode, if any
  if (this.measureHandler) {
    switch (this.measureMode) {
      case 'lazy':
        this.off('idle', this.measureHandler)
        break
      case 'busy':
        this.off('move', this.measureHandler)
        break
      case 'none':
      default:
        break
    }
  }

  // Set new mode
  this.measureMode = measureMode

  // Exit if handler is not needed.
  if (this.measureMode === 'none') {
    return this
  }

  // Init measureHandler once.
  // The handler measures the planes and informs active camera capturers.
  if (!this.measureHandler) {
    const self = this
    this.measureHandler = () => {
      const measures = self.measureAll()
      const count = measures.length
      for (let i = 0; i < count; i += 1) {
        const plane = measures[i].plane
        if (plane.getCapturer) {
          // Is an Interactive
          const cameraCapturer = plane.getCapturer('camera')
          if (cameraCapturer && cameraCapturer.onmeasure) {
            // Has an active camera capturer
            cameraCapturer.onmeasure(measures[i])
          }
        }
        // else skip the plane
      }
    }
  }

  // Bind idle listeners
  if (this.measureMode === 'lazy') {
    this.on('idle', this.measureHandler)
    return this
  }

  if (this.measureMode === 'busy') {
    this.on('move', this.measureHandler)
    return this
  }

  throw new Error('Should not reach here')
}
