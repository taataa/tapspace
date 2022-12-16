module.exports = function (component, position) {
  // @Basis:prependChild(component, position)
  //
  // Place a component onto this basis. In DOM, adds the element of
  // the given component into the element of this basis before the first child.
  // To add after the last child, see Basis:appendChild.
  //
  // Parameters:
  //   component
  //     a Plane
  //   position
  //     optional Point or {x,y} or {x,y,z}.
  //     Defines the initial position for the component.
  //     You can leave the position parameter undefined and move
  //     .. the component to its position afterwards.
  //     Also, if you have already prepared the local coordinates
  //     .. of the component and want to preserve them as is,
  //     .. then leave the position parameter undefined.
  //
  // Return
  //   this, for chaining
  //
  // Complexity:
  //   with position: O(d) where d is the depth of affine tree.
  //   without position: O(1)
  //

  // Insert to DOM
  this.element.prepend(component.element)

  if (position) {
    component.translateTo(position)
  }

  return this
}
