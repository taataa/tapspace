// Dev note: possible alternative names: fitScale, matchScale, scaleToFit
// fitSize, matchSize, fitInside, fitOutside, fitHull, resizeToFit
// matchPosition, matchScale, matchSize, matchRotation
//
module.exports = function (target, options) {
  // @Frame:fitShape(target, options)
  //
  // Attempt to fit this frame to the given shape by transformation.
  // Can be used for example to scale a viewport to content or
  // match sizes of two elements.
  //
  // Parameters:
  //   target
  //     a Path or a Frame, the shape.
  //   options
  //     translate
  //       optional boolean, default true. If true, allow translation in 3D
  //       .. when fitting the shape.
  //     dilate
  //       optional boolean, default true. If true, allow scaling
  //       .. when fitting the shape.
  //     resize
  //       optional boolean, default true. If true, allow resizing
  //       .. when fitting the shape. Note that dilation takes
  //       .. precedence over resize, thus set dilate:false to match
  //       .. apparent size only by resizing.
  //     rotate
  //       optional boolean, default true. If true, allow rotation
  //       .. when fitting the shape.
  //
  // Return
  //   this, for chaining.
  //

  throw new Error('not implemented')

  // if (target.element && target.size) {
  //   // Is a Frame.
  //   // Approach: get full helmert transformation from this to the target and
  //   // reduce it according to the options.
  //   const helm = this.getTransitionTo(target)
  //
  // } else if (target.basis && target.path) {
  //   // Is a geometry.Path
  // }
}
