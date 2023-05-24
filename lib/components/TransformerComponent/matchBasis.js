const fine = require('affineplane')
const plane3 = fine.plane3

module.exports = function (source, target) {
  // @TransformerComponent:matchBasis(source, target)
  //
  // Transform the element so that source basis position on the element
  // will match the target basis.
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

  if (source.transitRaw) {
    source = source.transitRaw(this)
  }
  if (target.transitRaw) {
    target = target.transitRaw(this)
  }

  const tr = plane3.difference(target, source)

  this.tran = plane3.compose(tr, this.tran)

  this.renderTransform()

  return this
}
