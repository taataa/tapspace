const applyTransform3d = require('../TransformerComponent/dom/applyTransform3d')
const plane3 = require('affineplane').plane3

module.exports = function () {
  // @Hyperspace:renderTransform()
  //
  // Update the element.style.transform according to the basis placement.
  //
  // You need to call this function only when you have manually edited
  // or replaced the hyperspace.tran object and want to commit the edit
  // to CSS.
  //
  // Return
  //   this, for chaining
  //

  const tran = this.tran

  // DEBUG Ensure valid transition, a plane
  if (!plane3.validate(tran)) {
    throw new Error('Invalid hyperspace transform: ' + tran)
  }

  applyTransform3d(this.element, tran)

  return this
}
