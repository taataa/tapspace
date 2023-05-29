const fine = require('affineplane')
const plane3 = fine.plane3
const size3 = fine.size3

const normalizeMargin = (m, viewportSize, frameSize) => {
  // Normalize margin option to a ratio.
  //
  // Parameters:
  //   m
  //     a number or string
  //
  // Return
  //   a number
  //

  // Determine the limiting dimension.
  // Think extremes:
  //   tall screen & wide item: item width limits
  //   wide screen & tall item: item height limits
  const widthRatio = frameSize.w / viewportSize.w
  const heightRatio = frameSize.h / viewportSize.h
  const doesFrameWidthLimit = widthRatio >= heightRatio

  let margin = 0.2
  if (typeof m === 'string') {
    // Extract value and unit
    const parts = m.match(/^(\d*.?\d+)(%|px)$/)
    if (parts) {
      const value = parseFloat(parts[1])
      const unit = parts[2]
      if (unit === '%') {
        // Convert percentage to ratio
        margin = value / 100
        // Max is half of the dim cuz the opposite margin
        margin = Math.min(50, margin)
      } else if (unit === 'px') {
        // Convert px to ratio of viewport dimesion.
        if (doesFrameWidthLimit) {
          margin = value / viewportSize.w
        } else {
          margin = value / viewportSize.h
        }
      }
    } else {
      // No match.
      throw new Error('Invalid margin option: ' + m)
    }
  } else if (typeof m === 'number') {
    // Assume pixels.
    // Convert px to ratio of viewport dimesion.
    if (doesFrameWidthLimit) {
      margin = m / viewportSize.w
    } else {
      margin = m / viewportSize.h
    }
  }

  return margin
}

module.exports = function (frame, options) {
  // @Viewport:zoomTo(frame[, options])
  //
  // Translate, rotate, and scale the viewport to display the given frame.
  // You may specify margin to control how much room to leave around the frame.
  //
  // Parameters:
  //   frame
  //     a FrameComponent
  //   options
  //     margin
  //       optional string. Default is '20%', maximum is '50%'.
  //       .. Determines how much room to leave between viewport borders
  //       .. and frame borders. Measured on the viewport.
  //       .. For example if margin is '10%' then focusTo leaves at least 10%
  //       .. of the viewport width to left and right sides of the frame
  //       .. and at least 10% of the viewport height to top and bottom sides.
  //
  // Return
  //   this, for chaining
  //

  if (!options) {
    options = {}
  }

  // The viewport should be scaled so that the margin is respected.
  // We need to compare the sizes. We can compare the raw sizes because
  // the coordinate systems will initially be matched.
  const portSize = this.getSize().getRaw()
  const frameSize = frame.getSize().getRaw()

  const margin = normalizeMargin(options.margin, portSize, frameSize)

  const widthRatio = frameSize.w / portSize.w
  const heightRatio = frameSize.h / portSize.h

  // To respect margin, limit the size ratio between frame and viewport.
  // Desired ratio between frame size and viewport size is our goal.
  const goalRatio = 1 - margin - margin
  // If the width ratio is smaller than the height ratio, it means that
  // there is less space above and below than left or right.
  // Pick the larger.
  const sizeRatio = Math.max(widthRatio, heightRatio)
  // Compute scaling factor that would bring the size ratio to the goal ratio.
  // For example, if goal ratio is 0.6 and size ratio is 1.2, then
  // we must scale the viewport larger by the factor of 2, which
  // implies space scale factor 0.5.
  const scaleFactor = goalRatio / sizeRatio

  // Get transition that when applied to space, makes the viewport to match
  // the coordinate system of the frame.
  let tran = this.getTransitionTo(frame)
  // Dilate to desired scale.
  const scaleOrigin = { x: 0, y: 0 }
  tran = plane3.scaleBy(tran, scaleOrigin, scaleFactor)

  // Now we have the correct scale and orientation.
  // The final step is to compute translation so that the frame
  // becomes centered. Use viewport coordinates.
  const scaledFrameSize = size3.scaleBy(frameSize, scaleFactor)
  const offsetX = (portSize.w - scaledFrameSize.w) / 2
  const offsetY = (portSize.h - scaledFrameSize.h) / 2

  tran = plane3.translateBy(tran, { x: offsetX, y: offsetY })

  this.hyperspace.transformBy(tran)

  return this
}
