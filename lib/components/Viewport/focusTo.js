const fine = require('affineplane')
const plane3 = fine.plane3
const size3 = fine.size3

module.exports = function (frame, options) {
  // @Viewport:focusTo(frame[, options])
  //
  // Translate, rotate, and scale the viewport to display the given frame.
  // You may specify margin to control how much room to leave around the frame.
  //
  // Parameters:
  //   frame
  //     a Frame
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

  // Determine the limiting dimension.
  // Think extremes:
  //   tall screen & wide item: item width limits
  //   wide screen & tall item: item height limits
  const widthRatio = frameSize.w / portSize.w
  const heightRatio = frameSize.h / portSize.h
  const doesFrameWidthLimit = widthRatio >= heightRatio

  // Normalize margin option to a ratio.
  let margin = 0.2
  if (typeof options.margin === 'string') {
    // Extract value and unit
    const parts = options.margin.match(/^(\d*.?\d+)(%|px)$/)
    if (parts) {
      const value = parseFloat(parts[1])
      const unit = parts[2]
      if (unit === '%') {
        // Convert percentage to ratio
        margin = value / 100
      } else if (unit === 'px') {
        // Convert px to ratio of viewport dimesion.
        if (doesFrameWidthLimit) {
          margin = value / portSize.w
        } else {
          margin = value / portSize.h
        }
      }
    } else {
      // No match.
      throw new Error('Invalid margin option: ' + options.margin)
    }
  } else if (typeof options.margin === 'number') {
    // Assume pixels.
    // Convert px to ratio of viewport dimesion.
    if (doesFrameWidthLimit) {
      margin = options.margin / portSize.w
    } else {
      margin = options.margin / portSize.h
    }
  }

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
  const scaleOrigin = { x: 0, y: 0, z: 0 }
  tran = plane3.scaleBy(tran, scaleOrigin, scaleFactor)

  // Now we have the correct scale and orientation.
  // The final step is to compute translation so that the frame
  // becomes centered. Use viewport coordinates.
  const scaledFrameSize = size3.scaleBy(frameSize, scaleFactor)
  const offsetX = (portSize.w - scaledFrameSize.w) / 2
  const offsetY = (portSize.h - scaledFrameSize.h) / 2

  // Detail from art and visual psychology:
  // If vertical centering is done in strictly mathematical sense,
  // our gravity-biased mind thinks the centered item is too low and sad.
  // Thus we lift the vertical offset for the position to look more perky.
  let adjustedY
  // We do the adjustment only if there is enough offset.
  // When margin is set zero, the offset is zero,
  // and then the adjustment would only be annoying.
  if (offsetY > 10) {
    adjustedY = offsetY * 0.9
  } else {
    adjustedY = offsetY
  }

  tran = plane3.translateBy(tran, { x: offsetX, y: adjustedY })

  this.hyperspace.transformBy(tran)

  return this
}
