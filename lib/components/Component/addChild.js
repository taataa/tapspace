module.exports = function (component, position) {
  // @Component:addChild(component, position)
  // @Component:appendChild
  //
  // Place a component onto this basis. In DOM, appends the element of
  // the given component into the element of this basis.
  // Appending means that the component is added after the last child.
  // To add before the first child, see Component:prependChild.
  //
  // Parameters:
  //   component
  //     a Component
  //   position
  //     optional Point or {x,y} or {x,y,z}.
  //     Defines the initial position for the component.
  //     You can leave the position parameter undefined and move
  //     .. the component to its position afterwards.
  //     Also, if you have already prepared the local transition
  //     .. of the component and want to preserve it as is,
  //     .. then leave the position parameter undefined.
  //
  // Return
  //   this, for chaining
  //
  // Complexity:
  //   with position: O(d) where d is the depth of the affine tree.
  //   without position: O(1)
  //

  // Insert to DOM
  this.element.appendChild(component.element)

  if (position) {
    component.translateTo(position)
  }

  return this
}
