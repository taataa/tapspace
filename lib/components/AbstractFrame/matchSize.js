module.exports = function (target) {
  // AbstractFrame:matchSize(target)
  //
  // Resize this frame so that its physical size matches the physical size
  // of the target. The physical size is the size after scaling.
  // If you need to match the inner width and height in pixels regardless of
  // scale, use AbstractFrame:matchPixelSize.
  //
  // Parameters
  //   target
  //     an AbstractFrame
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
