const applyTransform = require('./utils/applyTransform')
const applyTransform3d = require('./utils/applyTransform3d')
const counterTransformOrigin = require('./utils/counterTransformOrigin')

module.exports = function (opts) {
  // tapspace.components.AbstractPlane:renderTransform(opts)
  //
  // Update the element.style.transform according to the plane placement.
  //
  // You need to call this function only when you have manually edited
  // or replaced the component.tran object.
  //
  // Parameters:
  //   opts
  //     projection
  //       optional plane3 transition to be used instead of this.tran.
  //       .. Useful when the position needs visual adjustment
  //       .. without modifying the transition. See snapPixels.
  //

  let tran = this.tran

  // Handle custom plane
  if (opts && opts.projection) {
    tran = opts.projection
  }

  tran = counterTransformOrigin(tran, this.anchor)

  if (tran.z) {
    applyTransform3d(this.element, tran)
  } else {
    applyTransform(this.element, tran)
  }
}
