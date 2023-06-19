module.exports = function (id, content) {
  // @TreeLoader:replaceSpace(id, content)
  //
  // Replace space component, given that it exists.
  // The basis of the old space is reused.
  // Use TreeLoader:addSpace to add a non-existing space.
  //
  // Parameters:
  //   id
  //     a string
  //   content
  //     a Component, the space
  //

  // Space must exist already.
  const oldSpace = this.spaces[id]
  if (!oldSpace) {
    // TODO fail silently because old space likely removed during loading?
    // TODO or should the host app test if space exists? :hasSpace(id)?
    console.warn('Cannot replace non-existing space: ' + id)
    return
  }

  // Reuse basis. Transit to viewport so that the basis is
  // still usable after old space is removed from DOM.
  const basis = oldSpace.getBasis().changeBasis(this.viewport)

  this.spaces[id] = content
  this.viewport.hyperspace.replaceChild(oldSpace, content)

  content.setBasis(basis)
}
