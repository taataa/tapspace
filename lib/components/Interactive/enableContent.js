module.exports = function () {
  // @Interactive:enableContent()
  //
  // Enable interaction with item content instead of the item.
  // Make any interaction with the content disconnected from
  // interactions in affine space.
  //
  // Return
  //   this, for chaining.
  //

  this.element.dataset.affineAction = 'content'
}
