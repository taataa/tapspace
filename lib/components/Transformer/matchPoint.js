module.exports = function (source, target) {
  // @Transformer:matchPoint(source, target)
  //
  // Moves the element so that source point position on the element
  // matches the target position.
  //
  // Parameters:
  //   source
  //     a Point
  //   target
  //     a Point
  //
  // Return
  //   this, for chaining
  //
  const v = source.getVectorTo(target)
  this.translateBy(v)

  return this
}
