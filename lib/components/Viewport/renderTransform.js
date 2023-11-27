module.exports = function () {
  // @Viewport:renderTransform()
  //
  // You should never call this method for Viewport.
  // This method overrides Transformer:renderTransform and
  // its sole purpose is to throw an error if accidentally called.
  //
  // See also Hyperspace:renderTransform
  //
  throw new Error('Unexpected Viewport:renderTransform call.')
}
