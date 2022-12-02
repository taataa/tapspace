const applyTransform3d = require('./dom/applyTransform3d')
const counterTransformOrigin = require('./patch/counterTransformOrigin')
const plane3 = require('affineplane').plane3

module.exports = function (alt) {
  // @Plane:renderTransform(alt)
  //
  // Update the element.style.transform according to the plane placement.
  //
  // You need to call this function only when you have manually edited
  // or replaced the component.tran object.
  //
  // Parameters:
  //   alt
  //     optional plane3 transition to be used instead of this.tran.
  //     .. Useful when the position needs visual adjustment
  //     .. without modifying the transition. See for example snapPixels.
  //

  let tran = this.tran

  // DEBUG Ensure valid transition, a plane
  if (!plane3.validate(tran)) {
    throw new Error('Invalid plane transform: ' + tran)
  }

  // Handle custom plane
  if (alt) {
    tran = alt
  }

  tran = counterTransformOrigin(tran, this.anchor)

  applyTransform3d(this.element, tran)
}
