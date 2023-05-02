module.exports = function (target) {
  // @FrameComponent:matchSize(target)
  //
  // Resize this frame so that its physical size matches the physical size
  // of the target. The physical size is the size after scaling.
  // If you need to match the inner width and height in pixels regardless of
  // scale, use FrameComponent:matchPixelSize.
  //
  // Parameters
  //   target
  //     a FrameComponent
  //
  // Return
  //   this, for chaining
  //

  // The question is: how much to add to the inner size here so that
  // the physical size equals the target.

  const targetSize = target.getSize()
  this.setSize(targetSize)

  return this
}
