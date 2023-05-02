module.exports = function () {
  // @Viewport:getAspectRatio()
  //
  // Get width to height ratio of the viewport.
  //
  // Return
  //   a number
  //
  const size = this.getSize().size
  return size.w / size.h
}
