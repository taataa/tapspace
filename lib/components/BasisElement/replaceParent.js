const fine = require('affineplane')
const plane3 = fine.plane3

module.exports = function (newParent) {
  // @BasisElement:replaceParent(newParent)
  //
  // Switches the parent by preserving the global position.
  // Useful for example when you need to remove the parent
  // but want to preserve some of the children at their original positions.
  //
  // To specify a new position or to preserve the local position with respect
  // to the parent origin, see BasisElement:setParent.
  //
  // Parameters:
  //   newParent
  //     a BasisElement.
  //
  // Return
  //   this, for chaining
  //
  // Throws
  //   if this basis and the newParent are not in the same space.
  //   This includes the situation where this has no parent.
  //

  // DEBUG Validate to catch bugs
  if (!newParent.element || !newParent.element.affine) {
    throw new Error('Cannot append to non-affine element.')
  }

  // Ensure has parent
  const oldParent = this.getParent()
  if (!oldParent) {
    throw new Error('Cannot replace non-existing parent.')
  }

  // Try to transit current placement on the new parent.
  // We find out if they are connected.
  const tr = oldParent.getTransitionTo(newParent)
  const tranOnNew = plane3.transitFrom(this.tran, tr)

  // TODO If this and parent are not connected,
  // TODO instead of throwing an error, just preserve
  // TODO either the local placement or the placement relative to viewport.
  // TODO Or is it dangerous for catching bugs?

  // Insert to DOM
  newParent.element.appendChild(this.element)
  // Preserve transition
  this.tran = tranOnNew

  // Local transition changed, thus refresh.
  this.renderTransform()

  return this
}
