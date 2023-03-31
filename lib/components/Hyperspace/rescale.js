const fine = require('affineplane')
const plane3 = fine.plane3

module.exports = function () {
  // @Hyperspace:rescale()
  //
  // Balance space scales near one.
  //
  // Parameters
  //
  // Return
  //   this, for chaining
  //

  const children = this.getChildren()

  const hspace = this
  const scales = children.map(c => c.getScale().transitRaw(hspace))
  const dilation = 1 / scales.reduce((acc, s) => acc * s, 1)

  console.log('dilation', dilation)

  return this
}
