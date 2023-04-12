const fine = require('affineplane')
const plane3 = fine.plane3
const size3 = fine.size3
const box3 = fine.box3

const convertMarginToRatio = (margin, pixelsize) => {
  // Handle margin options.
  //
  // Parameters:
  //   margin
  //     undefined, number of pixels, or length string '20%' or '20px'
  //   pixelsize
  //     a number, the total length along which the margin is measured.
  //     .. Used only if margin is given in pixels and not in percentage.
  //
  // Return
  //   a number. Default is 0.2 if the given margin is undefined.
  //
  let ratio = 0.2

  if (typeof margin === 'string') {
    // Extract value and unit
    const parts = margin.match(/^(\d*.?\d+)(%|px)$/)
    if (parts) {
      const value = parseFloat(parts[1])
      const unit = parts[2]
      if (unit === '%') {
        // Convert percentage to ratio
        ratio = value / 100
      } else if (unit === 'px') {
        // Convert px to ratio of viewport dimesion.
        ratio = value / pixelsize
      }
    } else {
      // No match.
      throw new Error('Invalid margin option: ' + margin)
    }
  } else if (typeof margin === 'number') {
    // Assume pixels.
    // Convert px to ratio of viewport dimesion.
    ratio = margin / pixelsize
  }
  // TODO support Distance margin

  return ratio
}

module.exports = function (target, options) {
  // @Viewport:fit(target[, options])
  //
  // Translate, rotate, and/or scale the viewport to display the target.
  // You may specify margin to control how much room to leave around it.
  //
  // Parameters:
  //   target
  //     a FrameComponent or a Group
  //   options
  //     freedom
  //       optional string. Default is 'TS' meaning that translation and
  //       .. scaling are allowed. Set to 'TSR' to allow also rotation.
  //     margin
  //       optional string. Default is '20%', maximum is '50%'.
  //       .. Determines how much room to leave between viewport borders
  //       .. and frame borders. Measured on the viewport.
  //       .. For example '10%' leaves at least 10% of the viewport width
  //       .. to left and right sides of the frame and at least 10% of
  //       .. of the viewport height to top and bottom sides.
  //
  // Return
  //   this, for chaining
  //

  if (!options) {
    options = {}
  }

  // To be able to fit to rotated or grouped content, we compute bounds.
  const bounds = target.getBoundingBox(this).getRaw()
  // bounds shares the basis of the viewport.

  // The viewport should be scaled so that the margin is respected.
  // We need to compare the sizes.
  const portSize = this.getSize().getRaw()
  const boundsSize = box3.getSize(bounds)

  // Think extremes:
  //   tall screen & wide item: item width limits
  //   wide screen & tall item: item height limits
  // Therefore determine the limiting dimension.
  const widthShare = boundsSize.w / portSize.w // portion of the viewport width
  const heightShare = boundsSize.h / portSize.h // portion of the viewp. height
  // If the item fills more width than height from the viewport,
  // the width becomes a limiting factor.
  const doesWidthLimit = widthShare >= heightShare
  const limit = doesWidthLimit ? portSize.w : portSize.h

  // Normalize margin option to a ratio, e.g. '20%' -> 0.2
  const margin = convertMarginToRatio(options.margin, limit)

  // To respect margin, limit the size share of the item on the viewport.
  // Our goal share maximizes the size but respects the margin.
  const goalShare = 1 - margin - margin

  // Compute such scaling of viewport that would make item size share
  // equal to the goal share.
  // For example, if the goal share is 0.6 and the size share is 1.2, then
  // we must scale the viewport larger by the factor of 2, which
  // implies shinking space by scale factor of 0.5.
  let scaleFactor
  if (doesWidthLimit) {
    scaleFactor = goalShare / widthShare
  } else {
    scaleFactor = goalShare / heightShare
  }

  // Get transition that when applied to space, makes the viewport to match
  // the coordinate system of the bounds.
  let tran = plane3.invert(box3.getBasis(bounds))
  // Dilate to desired scale.
  const scaleOrigin = { x: 0, y: 0, z: 0 }
  tran = plane3.scaleBy(tran, scaleOrigin, scaleFactor)

  // Now we have the correct scale and orientation.
  // The final step is to compute translation so that the frame
  // becomes centered. Use viewport coordinates.
  const scaledBoundsSize = size3.scaleBy(boundsSize, scaleFactor)
  const offsetX = (portSize.w - scaledBoundsSize.w) / 2
  const offsetY = (portSize.h - scaledBoundsSize.h) / 2

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
