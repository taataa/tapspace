module.exports = function (target) {
  // @FrameComponent:matchPixelSize(target)
  //
  // Resize this frame so that its pixel size matches the pixel size
  // of the target regardless of their scale. If you need to match their
  // physical sizes after scale, use FrameComponent:matchSize.
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

  const ts = target.getSize().size
  this.setSize(ts)

  return this
}
