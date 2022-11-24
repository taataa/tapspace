module.exports = function (newParent) {
  // @Basis:setParent(newParent)
  //
  // Appends the basis node as a child of another basis.
  // Removes the basis from the current parent, if any.
  // Appending makes the node the last child.
  //
  // Keeps the basis transition intact. Inheriting classes may overwrite
  // setParent to possibly match the position if in the same space.
  //
  // Parameters:
  //   newParent
  //     a Basis.
  //
  // Return
  //   this, for chaining
  //

  // Validate to catch bugs
  if (newParent.element && newParent.element.affine) {
    newParent.element.appendChild(this.element)
  } else {
    throw new Error('Cannot append to non-affine element.')
  }

  // TODO Does reparenting affect tapspace state?
  // TODO Could there be ongoing processes with internal state
  // TODO that could be distrupted by setParent?

  return this
}
