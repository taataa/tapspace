const plane3 = require('affineplane').plane3

module.exports = function () {
  // @Hyperspace:commit()
  //
  // Push hyperspace transformation to the spaces.
  //
  // Return
  //   this, for chaining
  //

  const tt = this.tran
  const spaces = this.getChildren()

  for (let i = 0; i < spaces.length; i += 1) {
    const space = spaces[i]
    space.tran = plane3.compose(tt, space.tran)
  }
  this.tran = plane3.IDENTITY

  // Update spaces' CSS transform
  for (let i = 0; i < spaces.length; i += 1) {
    spaces[i].renderTransform()
  }
  this.renderTransform()

  return this
}
