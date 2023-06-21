module.exports = function (oldChild, newChild) {
  // @Component:replaceChild(oldChild, newChild)
  //
  // Removes a child and replaces its position with a new one.
  // The operation preserves the anchor position, scale, and orientation
  // of the children. Size is not preserved, thus the new child might
  // occupy larger or smaller area than the replaced one.
  //
  // Parameters:
  //   oldChild
  //     a Component. Will be removed from the document.
  //   newChild
  //     a Component. Will be added to the document or reparented.
  //
  // Return
  //   this, for chaining
  //
  // Throws
  //   when the old child does not exist. This may reveal a race condition or
  //   .. otherwise unexpected situation.
  //

  // DEBUG Validate to catch bugs
  if (!oldChild.isComponent) {
    throw new Error('Cannot replace non-affine element.')
  }
  if (!newChild.isComponent) {
    throw new Error('Cannot replace with a non-affine element.')
  }

  // Ensure child
  if (oldChild.element.parentElement !== this.element) {
    throw new Error('Cannot replace non-existing element.')
  }

  // Save the transition
  const oldTran = oldChild.tran

  // TODO save the anchor position
  // const anc = oldChild.atAnchor(); newChild.translateTo(anc)

  // Replace in DOM
  oldChild.element.replaceWith(newChild.element)
  newChild.tran = oldTran

  // Local transition of the new child changed, thus refresh.
  newChild.renderTransform()

  return this
}
