module.exports = function (c) {
  // @Viewport:hasControl(c)
  //
  // Check if the viewport has the given component attached as a control.
  // If the given component is not found among the viewport controls then the method will return false.
  //
  // Parameters:
  //   c
  //     a Component, the possible control component.
  //
  // Return
  //   boolean, true if the viewport has the given control.
  //
  // Complexity
  //   O(1) because the parenthood is tested in DOM via the given component.
  //
  return this.controls.hasChild(c)
}
