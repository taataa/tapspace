// const fine = require('affineplane')
// const box3 = fine.box3

module.exports = function (target, margin) {
  // @Viewport:zoomToFit(target, margin)
  //
  // Translate the viewport so that it fully fits inside the target.
  // In other words, translate so that the target fills the viewport entirely.
  // See Viewport:zoomToFill to fully fit a target inside the viewport.
  //
  // Zooming does not rotate the viewport. In order to do a screw-zoom and
  // match the orientation of the target, first call Transform:setOrientation.
  //
  // Parameters:
  //   target
  //     a BlockComponent or a Box.
  //   margin
  //     optional Distance or a number in viewport pixels. Default is `0`.
  //     .. Amount of margin to leave between the viewport and target bounds.
  //     .. For example, value `50` will make the viewport fit in the area
  //     .. that we would get if we shrank the target by 50 viewport pixels
  //     .. in every direction.
  //
  // Return
  //   this, for chaining
  //

  // Normalize target to a box3 in viewport orientation
  // if (target.getBoundingBox) {
  //   target = target.getBoundingBox(this)
  // }
  // if (target.transitRaw) {
  //   target = target.transitRaw(this)
  // }

  // Normalize the margin to pixels
  // if (margin.transitRaw) {
  //   margin = margin.transitRaw(this)
  // }

  // Project the box onto the viewport
  // TODO box3.projectTo(target, viewport.tran, viewport at camera)

  // Expand the box by the margin.
  // TODO origin = box2.atNorm(box, 0.5, 0.5)
  // TODO box2.resizeBy(box, origin, margin, margin)

  // Find scale difference between viewport and the box
  // TODO
  // TODO Pick smaller in order to fit.
  // TODO const scaleFactor = Math.max(widthFactor, heightFactor)

  // Convert scaling factor to a translation.
  // TODO helm3.projectToTranslation
  // TODO vec3.fromDilation

  // TODO translate

  // TODO return this

  throw new Error('Not implemented')
}
