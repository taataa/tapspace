module.exports = function () {
  // tapspace.components.AbstractNode:getElement()
  //
  // Get the affine HTML element of the component.
  // Note that if you created the component from
  // a HTML string or HTML element using tapspace.element,
  // the element returned by this function is not the element
  // you gave but the element that wraps it.
  //
  // Return
  //   a HTMLElement
  //
  return this.element
}
