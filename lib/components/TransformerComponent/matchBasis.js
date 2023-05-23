module.exports = function (source, target) {
  // @TransformerComponent:matchBasis(source, target)
  //
  // Transform the element so that source basis position on the element
  // matches the target basis.
  //
  // Parameters:
  //   source
  //     a Basis
  //   target
  //     a Basis
  //
  // Return
  //   this, for chaining
  //
  const tr = source.getTransformTo(target)
  this.transformBy(tr)

  return this
}
