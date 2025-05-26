module.exports = function (c) {
  // @Component:hasChild(c)
  //
  // Check if the component has the given component as a direct affine child.
  // If the given component is not a direct child but a descendant, the method will return false.
  // If the given component is the component itself, the method will return false.
  //
  // Parameters:
  //   c
  //     a Component, the possible child component.
  //
  // Return
  //   boolean, true if the given component is a direct affine child. False otherwise.
  //
  // Complexity
  //   O(1) because the parenthood is tested in DOM via the given child.
  //

  if (!c || !c.element || !c.element.parentElement) {
    return false
  }

  if (c.element.parentElement === this.element) {
    return true
  }

  return false
}
