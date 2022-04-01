module.exports = () => {
  // Find the layer of the element.
  //
  // Return
  //   a HTMLElement, the layer of the affine element.
  //   null, if the element does not belong to any space.
  //

  let el = this.el.parentNode

  while (el && el.affine) {
    if (el.affine.type === 'layer') {
      return el
    }
    el = el.parentNode
  }

  // The element is DOM root or has no affine parent.
  // Therefore, no layer found.
  return null
}
