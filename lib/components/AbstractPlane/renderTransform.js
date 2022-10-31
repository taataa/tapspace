const applyTransform = require('./utils/applyTransform')
const applyTransform3d = require('./utils/applyTransform3d')
const counterTransformOrigin = require('./utils/counterTransformOrigin')
const affineplane = require('affineplane')

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

  // DEBUG Ensure valid transition, a plane
  if (!affineplane.plane3.validate(tran)) {
    throw new Error('Invalid plane transform: ' + tran)
  }

  // Handle custom plane
  if (opts && opts.projection) {
    tran = opts.projection
  }

  tran = counterTransformOrigin(tran, this.anchor)

  applyTransform3d(this.element, tran)
}
