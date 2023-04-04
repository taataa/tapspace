module.exports = function (component, position) {
  // @Plane:addChild(component, position)
  // @Plane:appendChild
  //
  // Place a component onto this plane. Same as BasisElement:addChild but
  // ensures that the component is not added off the plane, onto different z.
  // Spaces can be added onto the plane although they and their contents are
  // displayed flat.
  //
  // Parameters:
  //   component
  //     a BasisElement
  //   position
  //     optional Point
  //
  // Return
  //   this, for chaining
  //

  // Insert to DOM
  this.element.appendChild(component.element)

  if (position) {
    if (position.transitRaw) {
      position = position.transitRaw(this)
    }

    // Force onto the plane
    position.z = 0

    component.translateTo(position)
  }

  return this
}
