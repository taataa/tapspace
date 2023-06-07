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
  this.renderTransform()
  for (let i = 0; i < spaces.length; i += 1) {
    spaces[i].renderTransform()
  }

  // TODO detect singular planes?
  // Detect and handle singular inversion errors.
  // try {
  //   ...
  // } catch (err) {
  //   if (err.message.startsWith('Singular')) {
  //     console.warn('Singular space transformation detected. ' +
  //       'Prevent rendering of nano-scale elements. ' +
  //       'Use Tapspace.js loaders and measuring methods to detect ' +
  //       'and remove them gracefully.')
  //   } else {
  //     throw err
  //   }
  // }

  return this
}
