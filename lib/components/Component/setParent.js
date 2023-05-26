module.exports = function (newParent, position) {
  // @Component:setParent(newParent[, position])
  //
  // Appends the basis node as a child of another basis.
  // Removes the basis from the current parent, if any.
  // Appending places the node after its siblings in DOM.
  //
  // The operation allows a position which defines where this node
  // will be added on the parent. Omitting the position preserves
  // the local placement of the node while not preserving the global
  // placement. See Component:replaceParent to preserve the global placement.
  //
  // Parameters:
  //   newParent
  //     a Component.
  //   position
  //     optional Point. If given, translates this node to this
  //     position on the new parent. If omitted, preserves the current
  //     local placement, if any.
  //
  // Return
  //   this, for chaining
  //

  // DEBUG Validate to catch bugs
  if (!newParent.element || !newParent.element.affine) {
    throw new Error('Cannot append to non-affine element.')
  }

  // Use addChild in order to support adding to hyperspace via viewport.
  newParent.addChild(this, position)

  // TODO Does reparenting affect tapspace state?
  // TODO Could there be ongoing processes with internal state
  // TODO that could be distrupted by setParent?
  // TODO No, as long as we do not cache references to ancestors.

  return this
}
